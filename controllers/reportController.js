const {
  Transaction,
  User,
  Payment,
  Order_item,
  Service,
} = require("../db/models");
const { Op } = require("sequelize");

exports.getTransactionReport = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;

    const where = {};
    const paymentWhere = {};

    // 🔹 Filter tanggal berdasarkan createdAt
    // 🔹 Filter tanggal berdasarkan createdAt
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      where.createdAt = { [Op.between]: [start, end] };
    } else if (startDate) {
      const start = new Date(startDate);
      where.createdAt = { [Op.gte]: start };
    } else if (endDate) {
      const end = new Date(endDate);
      where.createdAt = { [Op.lte]: end };
    }

    // 🔹 Filter status pembayaran
    if (status && status !== "all" && status !== "") {
      paymentWhere.paymentStatus = status;
    }

    const transactions = await Transaction.findAll({
      where,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["userId", "name", "email"],
        },
        {
          model: Payment,
          as: "payment",
          attributes: ["paymentStatus", "paymentType", "grossAmount"],
          // kalau user filter status pembayaran → required: true (harus punya payment)
          where: Object.keys(paymentWhere).length ? paymentWhere : undefined,
          required: Object.keys(paymentWhere).length > 0,
        },

        {
          model: Order_item,
          as: "order_item",
          include: [
            {
              model: Service,
              as: "service",
              attributes: ["laundryCategory", "price"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Hitung total pendapatan
    const totalRevenue = transactions.reduce(
      (sum, trx) => sum + (trx.payment?.grossAmount || 0),
      0
    );

    res.status(200).json({
      message: "Transaction report fetched successfully",
      data: transactions,
      summary: {
        totalTransactions: transactions.length,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({
      message: "Error fetching report",
      error: error.message,
    });
  }
};
