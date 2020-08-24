const Users = require("./../models/Users");
const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  let isAdmin = await Users.aggregate([])
    .match({ _id: mongoose.Types.ObjectId(req.user.id) })
    .lookup({
      from: "groups",
      localField: "groups",
      foreignField: "_id",
      as: "groups_list",
    })
    .project({
      "groups_list.name": 1,
    })
    .then((result) => {
      if (!result[0].groups_list.some((e) => e.name === "Admin")) {
        //check if next exist -> return response
        if (typeof next !== "undefined") {
          res.status(400).json({ message: "Not allowed for this user" });
        }
        return false;
      } else {
        req.user.admin = true;

        next();
        return true;
      }
    })
    .catch((err) => {});
  return isAdmin;
};
