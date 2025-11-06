const {
  Transaction,
  User,
  Payment,
  Order_item,
  Service,
} = require("../db/models");
const { Op } = require("sequelize");

// Controller untuk laporan transaksi
exports.getTransactionReport = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;

    // Filter dinamis
    const where = {};
    if (status) where.status = status;
    if (startDate && endDate) {
      const start = new Date(`${startDate}T00:00:00.000Z`);
      const end = new Date(`${endDate}T23:59:59.999Z`);
      where.createdAt = { [Op.between]: [start, end] };
    } else if (startDate) {
      const start = new Date(`${startDate}T00:00:00.000Z`);
      where.createdAt = { [Op.gte]: start };
    } else if (endDate) {
      const end = new Date(`${endDate}T23:59:59.999Z`);
      where.createdAt = { [Op.lte]: end };
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

    // Opsional: hitung total revenue & total transaksi
    const totalRevenue = transactions.reduce(
      (sum, trx) => sum + (trx.payment?.grossAmount || 0),
      0
    );

    res.status(200).json({
      message: "Transaction report fetched successfully",
      totalTransactions: transactions.length,
      totalRevenue,
      data: transactions,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching report", error: error.message });
  }
};
