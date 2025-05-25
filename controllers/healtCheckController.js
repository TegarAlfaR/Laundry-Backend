const healthCheck = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      message: "success healt check",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
      data: null,
    });
  }
};

module.exports = { healthCheck };
