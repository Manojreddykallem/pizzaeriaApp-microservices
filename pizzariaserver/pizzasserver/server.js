const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");

app = express();
app.use(cors());

app.use("/pizzas", require("./routes/pizzasRoutes"));

const startServer = async () => {
  await connectDb();
  app.listen(5001, () => {
    console.log("Server is running");
  });
};

startServer()
