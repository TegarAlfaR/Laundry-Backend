const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cookieParser());

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
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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
