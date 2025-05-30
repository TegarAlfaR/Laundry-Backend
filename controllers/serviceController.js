const { Service } = require("../db/models");

const getServices = async (req, res) => {
  try {
    const services = await Service.findAll();

    if (!services || services.length === 0) {
      return res.status(404).json({
        status: "Failed",
        message: "Failed, services data not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Success get services data",
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

const getServiceById = async (req, res) => {
  const serviceId = req.params.id;

  try {
    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({
        status: "Failed",
        message: "Failed, serviceId is required",
        data: null,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: `Success get service data in id: ${serviceId}`,
      data: service,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

const createServices = async (req, res) => {
  const { laundryCategory, price } = req.body;

  try {
    if (!laundryCategory && !price) {
      return res.status(400).json({
        status: "Failed",
        message: "Failed, laundryCategory and price are required",
        data: null,
      });
    }

    const convertLaundryCategory = laundryCategory.toLowerCase();

    const newService = await Service.create({
      laundryCategory: convertLaundryCategory,
      price,
    });

    return res.status(201).json({
      status: "Success",
      message: "Success create new service",
      data: newService,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

const updateServices = async (req, res) => {
  const serviceId = req.params.id;
  const { laundryCategory, price } = req.body;

  try {
    if (!laundryCategory && !price) {
      return res.status(400).json({
        status: "Failed",
        message: "Failed, laundryCategory or price are required",
        data: null,
      });
    }

    const service = await Service.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({
        status: "Failed",
        message: `Failed, service data with id: ${serviceId} not found`,
        data: null,
      });
    }

    const updatedService = await service.update({
      laundryCategory: laundryCategory.toLowerCase(),
      price: price,
      updatedAt: new Date(),
    });

    return res.status(200).json({
      status: "Success",
      message: "Success update service data",
      data: updatedService,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

const softDeleteService = async (req, res) => {
  const serviceId = req.params.id;
  try {
    const service = await Service.findByPk(serviceId);

    if (!serviceId) {
      return res.status(400).json({
        status: "Failed",
        message: "Failed, serviceId is required",
        data: null,
      });
    }

    if (!service) {
      return res.status(404).json({
        status: "Failed",
        message: `Failed, service data with id: ${serviceId} not found`,
        data: null,
      });
    }

    await service.update({
      deletedAt: new Date(),
    });

    return res.status(200).json({
      status: "Success",
      message: `Success delete service data in id: ${serviceId}`,
      data: service,
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
  getServices,
  getServiceById,
  createServices,
  updateServices,
  softDeleteService,
};
