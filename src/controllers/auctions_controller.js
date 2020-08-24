const Auctions = require("../models/Auctions");
const Users = require("../models/Users");
const e = require("express");
const card_to_blocked = require("../services/auction/card_to_blocked.js");
const auction_checker = require("../services/auction/auction_checker.js");

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
  //card_in_array = card_owner.cards.indexOf(req.body.card_id);
  //card_owner.splice(card_in_array, 1);

  const card_id = req.body.card_id;
  const price_start = req.body.price_start;
  const max_duration_auction = req.body.max_duration_auction;
  const max_bet = req.body.max_bet;
  const min_extension_time = req.body.min_extension_time;
  const min_bet_step = req.body.min_bet_step;
  const owner_id = req.user.id;
  const start_time = Date.now();

  //TODO validate fields before save
  let blocked = await card_to_blocked(req, res);
  if (blocked) {
    const newAuction = new Auctions({
      card_id,
      price_start,
      max_duration_auction,
      max_bet,
      min_extension_time,
      min_bet_step,
      owner_id,
      start_time,
    });
    console.log(newAuction);
    newAuction
      .save()
      .then((auction) => {
        auction_checker(auction);
        console.log("Auction succesfull created!");
        res.json(auction);
      })
      .catch((err) => {});
  }
};
