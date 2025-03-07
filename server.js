const app = require("./app");
const connectDb = require("./data/database");
connectDb();

app.listen(process.env.PORT, () => {
  console.log(
    `server is listening to port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
