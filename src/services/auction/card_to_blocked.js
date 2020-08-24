const Users = require("./../../models/Users");
const isAdmin = require("./../../helpers/is_admin.js");
const mongoose = require("mongoose");

module.exports = async function (req, res) {
  if (!(await isAdmin(req, res))) {
    console.log(req.body.card_id);
    let user_id = req.user.id;
    let card_id =
      typeof req.body.card_id !== "undefined" ? req.body.card_id : 0;
    Users.findById(user_id)
      .then((user) => {
        if (!user) res.status(404).json({ message: "User not found!" });
        //find card in cards array
        let card_index = user.cards.indexOf(card_id);
        if (card_index >= 0) {
          //remove card_id from cards array
          user.cards.splice(card_index, 1);

          //add card_id to blocked_cards array
          user.blocked_cards.push(card_id);
          user.markModified("cards");
          user.markModified("blocked_cards");
          user.save();
        } else {
          res.status(404).json({ message: "User doesnt have this card" });
          return false;
        }
      })
      .catch((err) => {});
  }
  return true;
};
