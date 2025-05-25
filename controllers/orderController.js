const { Order } = require("../db/models");

const getOrders = async (req, res) => {
  try {
    const orderData = await Order.findAll();
    if (!orderData || orderData.length === 0) {
      returnres.status(404).json({
        status: "failed",
        message: "Orders data is not found",
        data: null,
      });
    }

    returnres.status(200).json({
      status: "success",
      message: "success get all orders",
      data: orderData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const getOrderById = async (req, res) => {
  const id = req.params.id;

  try {
    const orderData = await Order.findByPk(id);

    if (!orderData) {
      return res.status(404).json({
        status: "failed",
        message: `data order by id ${id} is not found`,
        data: null,
      });
    }

    res.status(200).json({
      status: "success",
      message: "success get order by id",
      data: orderData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const createOrder = async (req, res) => {
  const { user_name, address, pickup_time, laundry_category, quantity } =
    req.body;

  try {
    if (
      !user_name ||
      !address ||
      !pickup_time ||
      !laundry_category ||
      !quantity
    ) {
      return res.status(400).json({
        status: "failed",
        message: "all fields are required",
        data: null,
      });
    }

    if (laundry_category == "cuci-setrika") {
      const total_price = 7000 * quantity;
      const newOrder = await Order.create({
        user_name,
        address,
        pickup_time,
        laundry_category,
        quantity,
        total_price,
        status: "pending",
      });

      returnres.status(201).json({
        status: "success",
        message: "success create order",
        data: newOrder,
      });
    } else if (laundry_category == "cuci") {
      const total_price = 4000 * quantity;
      const newOrder = await Order.create({
        user_name,
        address,
        pickup_time,
        laundry_category,
        quantity,
        total_price,
        status: "pending",
      });

      return res.status(201).json({
        status: "success",
        message: "success create order",
        data: newOrder,
      });
    } else if (laundry_category == "setrika") {
      const total_price = 4000 * quantity;
      const newOrder = await Order.create({
        user_name,
        address,
        pickup_time,
        laundry_category,
        quantity,
        total_price,
        status: "pending",
      });

      return res.status(201).json({
        status: "success",
        message: "success create order",
        data: newOrder,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

const hardDeleteOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedOrder = await Order.destroy({
      where: {
        order_id: id,
      },
    });

    if (!deletedOrder) {
      return res.status(404).json({
        status: "failed",
        message: `data order by id ${id} is not found`,
        data: null,
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: `success delete order in id ${id}`,
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: error.message,
      data: null,
    });
  }
};

module.exports = { getOrders, getOrderById, createOrder, hardDeleteOrder };
