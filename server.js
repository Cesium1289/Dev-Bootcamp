const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
//load env vars
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();
const app = express();

//Route bootcamps
const bootcamps = require("./routes/bootcamps");

//API body parser
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("default"));
}

//mount routers
app.use("/api/v1/bootcamps", bootcamps);

//use error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server runnning in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
