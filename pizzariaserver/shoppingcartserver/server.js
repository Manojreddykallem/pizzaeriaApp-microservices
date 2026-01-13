const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");

app = express();

app.use(cors());
app.use(express.json());

app.use("/cart", require("./routes/shoppingcartRoutes"));

const startServer = async () => {
  await connectDb();
  app.listen(5003, () => {
    console.log("server is running");
  });
};

startServer();
