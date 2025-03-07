const userModel = require("../Models/model.js");
const jwt = require("jsonwebtoken");

const isAuthenthicated = async(req,res,next) => {
    const {token} = req.cookies
    if(!token){
      return res.status(400).json({
        success: false,
        message: "Login first!!",
      });
    }
    
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded._id);
    next();
}



module.exports ={ isAuthenthicated};