const mongoose = require("mongoose");

const connectDb = ()=>{
    mongoose
      .connect(
        process.env.MONGO_URI,
        {
          dbName: "backend",
        }
      )
      .then(() => {
        console.log("connected to the database !!");
      })
      .catch((e) => {
        console.log("Error connecting to the database ",e);
      });
}

module.exports = connectDb;