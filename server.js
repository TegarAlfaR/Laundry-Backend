const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const router = require("./routers");

app.use(express.json());
app.use("/api/v1", router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
