const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../db/models");

const register = async (req, res) => {
  const { email, telephone, password, name } = req.body;

  try {
    if (!email || !telephone || !password || !name) {
      return res.status(400).json({
        status: "Failed",
        message: "Failed. email, telephone, password and name are required",
        data: null,
      });
    }

    const exsistingUser = await User.findOne({ where: { email } });

    if (exsistingUser) {
      return res.status(400).json({
        status: "Failed",
        message: "Failed, email already registered",
        data: null,
      });
    }

    const role = "user";
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      role: role,
      email,
      telephone,
      password: hashPassword,
    });

    return res.status(201).json({
      status: "Success",
      message: "Success register new user",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        status: "Failed",
        message: "Failed. email and password are required",
        data: null,
      });
    }

    const user = await User.findOne({ where: { email: email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        status: "Failed",
        message: "Failed, email or password is wrong",
        data: null,
      });
    }

    const payload = {
      id: user.userId,
      username: user.name,
      email: user.email,
    };

    const option = { httpOnly: true };

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRED_IN,
    });

    return res.status(200).cookie("token", token, option).json({
      status: "Success",
      message: "Success login",
      data: {
        token,
        payload,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

const logout = async (req, res) => {
  try {
    const option = { httpOnly: true };

    return res.status(200).clearCookie("token", option).json({
      status: "Success",
      message: "Success logout",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

module.exports = { register, login, logout };
