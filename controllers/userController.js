const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const imagekit = require("../lib/imagekit");
const { DATE } = require("sequelize");

const getUsers = async (req, res) => {
  try {
    const user = await User.findAll();

    if (!user || user.length === 0) {
      return res.status(404).json({
        status: "Failed",
        message: "Failed, user data not found",
        data: null,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: "Success get user data",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({
        status: "Failed",
        message: "Failed, userId is required",
        data: null,
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: `Failed, user data with id: ${userId} not found`,
        data: null,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: `Success get user data in id: ${userId}`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, password, telephone } = req.body;
    const file = req.file;

    if (!userId) {
      return res.status(400).json({
        status: "Failed",
        message: "Failed, userId is required",
        data: null,
      });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: `Failed, user data with id: ${userId} not found`,
        data: null,
      });
    }

    let updatedPassword = user.password;
    let updatedImageUrl = user.profileImage;

    if (file) {
      const split = file.originalname.split(".");
      const ext = split[split.length - 1];

      const updatedImage = await imagekit.upload({
        file: req.file.buffer,
        fileName: `Profile-${Date.now()}.${ext}`,
      });
      updatedImageUrl = updatedImage.url;
    }

    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }

    const updatedUser = await user.update({
      name,
      password: updatedPassword,
      telephone,
      updatedAt: new Date(),
      profileImage: updatedImageUrl,
    });

    return res.status(200).json({
      status: "Success",
      message: `Success update user data in id: ${userId}`,
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

module.exports = { getUsers, getUserById, updateUser };
