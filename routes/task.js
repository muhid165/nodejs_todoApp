// this file will connect the routes to the controller

const express = require("express");
const router = express.Router();
const {
  newTask,
  getMytask,
  updateMytask,
  deleteMytask,
} = require("../controllers/task");
const { isAuthenthicated } = require("../middlewares/Auth");

router.post("/new", isAuthenthicated, newTask);
router.get("/mytask", isAuthenthicated, getMytask);

router
  .route("/:id")
  .put(isAuthenthicated, updateMytask)
  .delete(isAuthenthicated, deleteMytask);

module.exports = router;
