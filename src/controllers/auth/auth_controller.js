const Users = require("../../models/Users");
const Groups = require("../../models/Groups");
const bcrypt = require("bcrypt");
const e = require("express");
const jwt = require("jsonwebtoken");
const jwt_secret = require("../../../vercel.json").env.jwtSecret;

exports.index = function (req, res) {
  Users.find().then((err, users) => {
    if (err) res.send(err);
    res.json(users);
  });
};

//Registration new user
exports.create = function (req, res) {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  //Check existing user with this mail
  Users.findOne({ email }).then(async (user) => {
    if (user) return res.status(400).json({ message: "User alredy exist" });
    let group = await Groups.findOne({ name: "User" });
    const newUser = new Users({
      name,
      email,
      password,
      groups: [group._id],
    });

    //hash password and save
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        newUser.save().then((user) => {
          //create JWT token
          jwt.sign(
            { id: user.id },
            jwt_secret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({ token, user });
            }
          );
        });
      });
    });
  });
};

//user auth
exports.auth = function (req, res) {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  //Check existing user by mail
  Users.findOne({ email }).then(async (user) => {
    if (!user) return res.status(400).json({ message: "User not exist" });

    //validate password

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });
      jwt.sign(
        { id: user.id },
        jwt_secret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );
    });
  });
};
