const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
      "tokens.status": "active",
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
