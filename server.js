const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const cors = require("cors");
app.use(cors());

const router = require("./routers");
const notFound = require("./middlewares/notFound");

app.use(express.json());

app.use("/api/v1", router);

app.use(notFound);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
