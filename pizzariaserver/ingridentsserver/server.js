const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");

app = express();
app.use(cors());

app.use("/ingridents", require("./routes/ingridentsRoutes"));

const startServer = async () => {
  await connectDb();
  app.listen(5002, () => {
    console.log("Server is running");
  });
};

startServer()