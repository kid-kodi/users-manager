const jwt = require("jsonwebtoken");
const ErrorHanlder = require("../helpers/errorHandler");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    return next(new ErrorHanlder(error.message, 401));
  }
};

module.exports = auth;
