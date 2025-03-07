const express = require("express");
const router = express.Router();
const {
  registerUser,
  userLogin,
  getMyProfile,
  logout,
} = require("../controllers/user");
const { isAuthenthicated } = require("../middlewares/Auth");


// Route to create a new user
router.post("/new", registerUser);
router.post("/login", userLogin);

router.get("/me",isAuthenthicated,getMyProfile);
router.get("/logout",logout);


  
module.exports = router;

// // Route to get user by id
// router.get("/userId/:id", findUserById);

// // Route to update user by id
// router.put("/userId/:id", updateById);

// // Route to delete user by id
// router.delete("/userId/:id", deleteById);


