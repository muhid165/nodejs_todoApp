// this file will contain the logic for the task routes
const Task = require("../Models/tasks");
const ErrorHandler = require("../middlewares/error");

const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({ title, description, user: req.user });
    res.status(201).json({
      success: true,
      message: "Task added successfully !!!",
    });
  } catch (error) {
    next(error);
  }
};

const getMytask = async (req, res) => {
  try {
    const user_id = req.user;

    const task = await Task.find({ user: user_id });
    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    next(error);
  }
};

const updateMytask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new Error("Task not found ", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task updated successfully !!!",
    });
  } catch (error) {
    next(error);
  }
};

const deleteMytask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new Error("Task not found ", 404));
    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted successfully !!!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newTask,
  getMytask,
  updateMytask,
  deleteMytask,
};
