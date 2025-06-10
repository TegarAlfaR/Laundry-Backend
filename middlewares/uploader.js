const multer = require("multer");

const multerFiltering = (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("image format is not valid"), false);
  }
};

const upload = multer({ fileFilter: multerFiltering });
module.exports = upload;
