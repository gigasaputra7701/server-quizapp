const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const testRoute = require("./routes/test");
const resultRoute = require("./routes/result");

const app = express();
require("dotenv").config();

//config mongodb
mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRoute);
app.use("/api", testRoute);
app.use("/api", resultRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on http://127.0.0.1:${PORT}`);
});
