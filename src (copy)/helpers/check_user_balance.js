const Users = require("./../models/Users");
const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
  await Users.aggregate([])
    .match({ _id: mongoose.Types.ObjectId(req.user.id) })
    .lookup({
      from: "bets",
      localField: "_id",
      foreignField: "user_id",
      as: "bets_list",
    })
    .unwind("$bets_list")
    .lookup({
      from: "auctions",
      localField: "bets_list.auction_id",
      foreignField: "_id",
      as: "auctions_list",
    })
    .match({ "auctions_list.is_opened": true })
    .unwind("$auctions_list")
    .group({
      _id: "$bets_list.auction_id",
      bet_id: { $first: "$bets_list._id" },
      maxBet: { $max: "$bets_list.bet" },
    })
    .group({
      _id: null,
      betsSum: { $sum: "$maxBet" },
      userBalance: { $first: "balance" },
    })
    .project({
      _id: 1,
      betsSum: 1,
      userBalance: 1,
    })
    .then((result) => {
      console.log(result);
      next();
    });
};
