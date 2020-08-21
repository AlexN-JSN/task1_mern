const jwt = require("jsonwebtoken");
const jwt_secret = require("../../vercel.json").env.jwtSecret;
const Users = require("./../models/Users");
const Groups = require("./../models/Groups");
const settings = require("./settings");
const e = require("express");

module.exports = async (req, res, next) => {
  let user_id = req.user.id;
  let user = await Users.findOne({ _id: user_id });
  let groups = await Groups.findOne({ name: "Admin" });
  if (!user.groups.includes(groups._id)) {
    res.status(400).json({ message: "Not allowed for this user" });
  } else {
    next();
  }
};
