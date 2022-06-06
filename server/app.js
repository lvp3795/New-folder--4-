require("dotenv").config();
require("express-async-errors");
var cors = require("cors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const auth = require("./routes/auth");

app.use(cors());
app.use(express.json());
app.use("/api", auth);

app.use(express.static("../public"));
app.use("/images", express.static("./images"));

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening to port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
