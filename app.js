const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
dotenv.config({ path: "./data/config.env" });

app.use(cookieParser());
app.use(express.json());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",  // only for debugging
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Code changed from github in masterbranch for CORS issue </h1>");
});



app.use(errorMiddleware);

module.exports = app;
