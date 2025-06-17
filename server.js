const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://antar-jemput-laundry.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

const router = require("./routers");
const notFound = require("./middlewares/notFound");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Welcome to Laundry API",
    data: null,
  });
});

app.use("/api/v1", router);

app.use(notFound);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
