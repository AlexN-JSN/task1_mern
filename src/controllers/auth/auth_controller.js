const Users = require("../../models/Users");
const Groups = require("../../models/Groups");
const bcrypt = require("bcrypt");
const e = require("express");
const jwt = require("jsonwebtoken");
const jwt_secret = require("../../../vercel.json").env.jwtSecret;
<<<<<<< HEAD
const settings = require("../../helpers/settings");

//Show all users
//Access: private
=======

>>>>>>> 9c1fe6ba8a3d63ec36bfcf5ab583325510bcbad0
exports.index = function (req, res) {
  Users.find().then((err, users) => {
    if (err) res.send(err);
    res.json(users);
  });
};

//Registration new user
<<<<<<< HEAD
//Access: private
=======
>>>>>>> 9c1fe6ba8a3d63ec36bfcf5ab583325510bcbad0
exports.create = function (req, res) {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  //Check existing user with this mail
  Users.findOne({ email }).then(async (user) => {
    if (user) return res.status(400).json({ message: "User alredy exist" });
<<<<<<< HEAD

    //get settings for default user group
    let setting_group = await settings.default_user_group();
    let default_group = setting_group !== null ? setting_group : "User";
    let group = await Groups.findOne({ name: default_group });
=======
    let group = await Groups.findOne({ name: "User" });
>>>>>>> 9c1fe6ba8a3d63ec36bfcf5ab583325510bcbad0
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

<<<<<<< HEAD
        //get expired date token from settings
        let settings_time = await settings.time_token_expired();
        let time_token_expired =
          parseInt(settings_time) !== null ? parseInt(settings_time) : 3600;

=======
>>>>>>> 9c1fe6ba8a3d63ec36bfcf5ab583325510bcbad0
        newUser.save().then((user) => {
          //create JWT token
          jwt.sign(
            { id: user.id },
            jwt_secret,
<<<<<<< HEAD
            { expiresIn: time_token_expired },
=======
            { expiresIn: 3600 },
>>>>>>> 9c1fe6ba8a3d63ec36bfcf5ab583325510bcbad0
            (err, token) => {
              if (err) throw err;
              res.json({ token, user });
            }
          );
<<<<<<< HEAD
          console.log(time_token_expired);
=======
>>>>>>> 9c1fe6ba8a3d63ec36bfcf5ab583325510bcbad0
        });
      });
    });
  });
};

<<<<<<< HEAD
//Auth
//Access: public
=======
//user auth
>>>>>>> 9c1fe6ba8a3d63ec36bfcf5ab583325510bcbad0
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
<<<<<<< HEAD
    bcrypt.compare(password, user.password).then(async (isMatch) => {
      //get expired date token from settings
      let settings_time = await settings.time_token_expired();
      let time_token_expired =
        parseInt(settings_time) !== null ? parseInt(settings_time) : 3600;

      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });
      //add token after auth
      jwt.sign(
        { id: user.id },
        jwt_secret,
        { expiresIn: time_token_expired },
=======

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ message: "Invalid credentials" });
      jwt.sign(
        { id: user.id },
        jwt_secret,
        { expiresIn: 3600 },
>>>>>>> 9c1fe6ba8a3d63ec36bfcf5ab583325510bcbad0
        (err, token) => {
          if (err) throw err;
          res.json({ token, user });
        }
      );
    });
  });
};
