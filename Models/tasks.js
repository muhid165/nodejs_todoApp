const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: "false",
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true,
  },
  createdAt: {
    type:Date,
    default:Date.now,
  },
});

const Tasks = mongoose.model("tasks", taskSchema);

module.exports = Tasks;
