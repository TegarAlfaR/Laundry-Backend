const { Transaction, Order_item, Service } = require("../db/models");

const getTransaction = async (req, res) => {
  try {
    const { userId, role } = req.user;
    let transactions;

    const includeOptions = [
      {
        model: Order_item,
        as: "order_item",
        include: {
          model: Service,
          as: "service",
        },
      },
    ];

    const orderOptions = [["createdAt", "DESC"]];

    if (role === "admin") {
      transactions = await Transaction.findAll({
        include: includeOptions,
        order: orderOptions,
      });
    } else {
      transactions = await Transaction.findAll({
        where: { userId: userId },
        include: includeOptions,
        order: orderOptions,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Success get transaction data",
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

const getTransactionById = async (req, res) => {
  const transactionId = req.params.id;

  try {
    if (!transactionId) {
      return res.status(400).json({
        status: "Failed",
        message: "Failed, transactionId is required",
        data: null,
      });
    }

    const transaction = await Transaction.findByPk(transactionId);

    if (!transaction) {
      return res.status(404).json({
        status: "Failed",
        message: `Failed, transaction data with id: ${transactionId} not found`,
        data: null,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: `Success get transaction data in id: ${transactionId}`,
      data: transaction,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

const createTransaction = async (req, res) => {
  const userId = req.user.userId;
  const { address, pickupTime, orderItems } = req.body;

  try {
    if (
      !address ||
      !pickupTime ||
      !Array.isArray(orderItems) ||
      orderItems.length === 0
    ) {
      return res.status(400).json({
        status: "Failed",
        message: "Failed. address, pickupTime and OrderItems is required",
        data: null,
      });
    }

    const newTransaction = await Transaction.create({
      userId: userId,
      address,
      pickupTime,
    });

    const orderItemsData = [];

    for (const item of orderItems) {
      const service = await Service.findByPk(item.serviceId);
      if (!service) continue;

      orderItemsData.push({
        transactionId: newTransaction.transactionId,
        serviceId: item.serviceId,
        quantity: null,
        subtotal: null,
      });
    }

    await Order_item.bulkCreate(orderItemsData);

    const transactionWithItems = await Transaction.findByPk(
      newTransaction.transactionId,
      {
        include: [{ model: Order_item, as: "order_item" }],
      }
    );

    return res.status(201).json({
      status: "Success",
      message: "Success create transaction data",
      data: transactionWithItems,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

const updateTransaction = async (req, res) => {
  const transactionId = req.params.id;
  const { items, status } = req.body;

  try {
    const validStatuses = ["pending", "on-progress", "success", "failed"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        status: "Error",
        message: "Invalid status value",
      });
    }

    const dataToUpdate = {};

    if (status) {
      dataToUpdate.status = status;
    }
    if (items && Array.isArray(items)) {
      let totalPrice = 0;

      for (const item of items) {
        const orderItem = await Order_item.findByPk(item.orderItemId);
        if (!orderItem) continue;

        const service = await Service.findByPk(orderItem.serviceId);
        if (!service) continue;

        const subtotal = item.quantity * service.price;

        await orderItem.update({
          quantity: item.quantity,
          subtotal,
        });

        totalPrice += subtotal;
      }
      dataToUpdate.totalPrice = totalPrice;
    }

    await Transaction.update(dataToUpdate, { where: { transactionId } });

    const updatedTransaction = await Transaction.findByPk(transactionId);

    return res.status(200).json({
      status: "Success",
      message: "Transaction updated successfully",
      data: updatedTransaction,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

module.exports = {
  getTransaction,
  getTransactionById,
  updateTransaction,
  createTransaction,
};
