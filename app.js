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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // or your frontend URL
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT,DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // handles preflight
  }

  next();
});


app.get("/", (req, res) => {
  res.send("<h1>Code changed from github in masterbranch for CORS issue 2nd TIME </h1>");
});



app.use(errorMiddleware);

module.exports = app;
