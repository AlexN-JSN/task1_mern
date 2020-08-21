const Auctions = require("../models/Auctions");
const Users = require("../models/Users");
const Groups = require("../models/Groups");
const e = require("express");

//Show all auctions
//Access: public
exports.index = function (req, res) {
  Auctions.find({}, function (err, group) {
    if (err) res.send(err);
    res.json(group);
  });
};

//Create new auctions
//Access: private
exports.create = async function (req, res) {
  //check is user admin
  const card_owner = await Users.findOne({ _id: req.user.id });
  let is_admin = false;
  for (const user_group of card_owner.groups) {
    let group = await Groups.findOne({ _id: user_group });
    if (group.name == "Admin") {
      is_admin = true;
    }
  }
  let card_id;
  //if admin, not remove card from array
  if (is_admin) {
    card_id = req.body.card_id;
    const price_start = req.body.price_start;
    const min_bet_step = req.body.min_bet_step;
    const max_duration_auction = req.body.max_duration_auction;
    const max_bet = req.body.max_bet;
    const min_extension_time = req.body.min_extension_time;
  } else {
    //if user remove card from cards array and put on blocked_cards array
    card_in_array = card_owner.cards.indexOf(req.body.card_id);
    if (card_in_array >= 0) {
      card_owner.splice(card_in_array, 1);
      card_id = req.body.card_id;
      card_owner.blocked_cards.push(card_id);
    }
    //get admins values in settings for users price
  }

  const price_start = req.body.price_start;
  const min_bet_step = req.body.min_bet_step;
  const owner_id = req.body.owner_id;
  const start_time = req.body.start_time;
  const duration_auction = req.body.duration_auction;
  const status = req.body.status;
};
