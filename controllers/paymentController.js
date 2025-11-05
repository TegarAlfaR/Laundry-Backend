const midtrans = require("../config/midtrans");
const {
  Transaction,
  Payment,
  User,
  Order_item,
  Service,
} = require("../db/models");

exports.createPayment = async (req, res) => {
  try {
    const { transactionId } = req.body;

    // ✅ Ambil data transaksi lengkap
    const transaction = await Transaction.findByPk(transactionId, {
      include: [
        { model: User, as: "user" },
        {
          model: Order_item,
          as: "order_item",
          include: [{ model: Service, as: "service" }],
        },
      ],
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // ✅ Buat item_details dari order_item
    const item_details = transaction.order_item.map((item) => ({
      id: item.service.serviceId.toString(),
      price: Number(item.service.price),
      quantity: item.quantity || 1,
      name: item.service.laundryCategory,
    }));

    // ✅ Hitung total
    const totalPrice = item_details.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (!totalPrice || totalPrice <= 0) {
      return res
        .status(400)
        .json({ message: "Total amount must be greater than 0" });
    }

    // ✅ Setup callback URLs (ubah domain sesuai app kamu)
    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"; // fallback dev

    const parameter = {
      transaction_details: {
        order_id: `ORDER-${Date.now()}-${transactionId}`,
        gross_amount: totalPrice,
      },
      customer_details: {
        first_name: transaction.user?.name || "Customer",
        email: transaction.user?.email || "user@example.com",
      },
      item_details,
      callbacks: {
        finish: `${FRONTEND_URL}/my-orders`,
        unfinish: `${FRONTEND_URL}/my-orders`,
        error: `${FRONTEND_URL}/my-orders`,
      },
    };

    // ✅ Buat transaksi ke Midtrans
    const midtransResponse = await midtrans.createTransaction(parameter);

    // ✅ Simpan ke database
    const payment = await Payment.create({
      transactionId,
      midtransOrderId: parameter.transaction_details.order_id,
      midtransTransactionToken: midtransResponse.token,
      grossAmount: totalPrice,
      paymentStatus: "pending",
    });

    return res.json({
      message: "Payment created successfully",
      redirectUrl: midtransResponse.redirect_url,
      token: midtransResponse.token,
      payment,
    });
  } catch (error) {
    console.error("❌ Error creating payment:", error);
    res.status(500).json({
      message: "Error creating payment",
      error: error.message,
    });
  }
};

// ============================================================
// 🔹 Webhook dari Midtrans (handle notifikasi pembayaran)
// ============================================================
exports.handleNotification = async (req, res) => {
  try {
    // 🔹 Tes koneksi dari Midtrans Dashboard
    if (req.body.test === "ping") {
      return res
        .status(200)
        .json({ message: "Webhook connected successfully!" });
    }

    const notification = req.body;
    const { order_id, transaction_status, transaction_id } = notification;

    const payment = await Payment.findOne({
      where: { midtransOrderId: order_id },
      include: [{ model: Transaction, as: "transaction" }],
    });

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    let newStatus = "pending";
    if (
      transaction_status === "settlement" ||
      transaction_status === "capture"
    ) {
      newStatus = "paid";
    } else if (
      transaction_status === "deny" ||
      transaction_status === "expire" ||
      transaction_status === "cancel"
    ) {
      newStatus = "failed";
    }

    // 🔹 Update payment status dan transaction status
    await payment.update({
      paymentStatus: newStatus,
      midtransTransactionId: transaction_id,
    });

    if (payment.transaction) {
      if (newStatus === "paid") {
        await payment.transaction.update({ status: "success" });
      } else if (newStatus === "failed") {
        await payment.transaction.update({ status: "failed" });
      }
    }

    console.log(`✅ Webhook processed: ${order_id} → ${newStatus}`);
    return res.status(200).json({ message: "Notification handled", newStatus });
  } catch (error) {
    console.error("❌ Error handling webhook:", error);
    return res.status(500).json({
      message: "Error handling notification",
      error: error.ApiResponse?.error_messages || error.message,
    });
  }
};
