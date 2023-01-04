const express = require("express");
const User = require("../models/User");
const router = express.Router();

// CREATE A USER
// URL : http://localhost:5000/users
// METHOD : POST
// REQUEST : { firstName, lastName, email, telephone, password }
// RESPONSE SUCCESS
// RESPONSE : STATUS - 201
// RESPONSE ERROR
// RESPONSE : STATUS - 401
router.post("/", async (req, res, next) => {
  try {
    const user = new User(req.body);
    const response = await user.save();
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// GET USERS
// URL : http://localhost:5000/users
// METHOD : GET
// REQUEST : null
// RESPONSE SUCCESS
// RESPONSE : STATUS - 201 [{User}]
// RESPONSE ERROR
// RESPONSE : STATUS - 401
router.get("/", async (req, res, next) => {
  try {
    let users = await User.find().select(
      "firstName lastName email telephone createdAt"
    );
    res.status(201).json(users);
  } catch (error) {
    next(error);
  }
});

// GET A USER
// URL : http://localhost:5000/users/:userId
// METHOD : GET
// REQUEST : null
// RESPONSE SUCCESS
// RESPONSE : STATUS - 201 [{User}]
// RESPONSE ERROR
// RESPONSE : STATUS - 401
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      "firstName lastName email telephone createdAt"
    );
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// UPDATE A USER
// URL : http://localhost:5000/users/:userId
// METHOD : PUT
// REQUEST : { firstName, lastName, email, telephone, password }
// RESPONSE SUCCESS
// RESPONSE : STATUS - 201
// RESPONSE ERROR
// RESPONSE : STATUS - 401
router.put("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// DELETE A USER
// URL : http://localhost:5000/users/:userId
// METHOD : DELETE
// REQUEST : {ids : [id1,id2,...]}
// RESPONSE SUCCESS
// RESPONSE : STATUS - 201
// RESPONSE ERROR
// RESPONSE : STATUS - 401
router.delete("/more", async (req, res, next) => {
  try {
    const response = await User.deleteMany({ _id: { $in: req.body.ids } });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

// DELETE A USER
// URL : http://localhost:5000/users/:userId
// METHOD : DELETE
// REQUEST : null
// RESPONSE SUCCESS
// RESPONSE : STATUS - 201
// RESPONSE ERROR
// RESPONSE : STATUS - 401
router.delete("/:id", async (req, res, next) => {
  try {
    const response = await User.findByIdAndDelete(req.params.id);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
