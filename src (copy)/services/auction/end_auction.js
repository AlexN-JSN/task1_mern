const Auctions = require("./../../models/Auctions.js");
const mongoose = require("mongoose");
const card_to_buyer = require("./card_to_buyer.js");
const return_card = require("./return_card.js");

module.exports = async function (auctions) {
  for await (const auction of auctions) {
    let buy_data = await Auctions.aggregate([])
      .match({ _id: auction._id })
      .lookup({
        from: "bets",
        localField: "_id",
        foreignField: "auction_id",
        as: "bets_list",
      })
      .unwind("$bets_list")
      .group({
        _id: "$bets_list._id",
        maxBet: { $max: "$bets_list.bet" },
        buyer_id: { $first: "$bets_list.user_id" },
        owner_id: { $first: "$owner_id" },
        auction_id: { $first: "$_id" },
        card_id: { $first: "$card_id" },
      })
      .project({
        _id: 1,
        maxBet: 1,
        buyer_id: 1,
        owner_id: 1,
        auction_id: 1,
        card_id: 1,
      })
      .sort({ maxBet: -1 })
      .limit(1);
    console.log(buy_data);
    //THIS AUCTION STATUS CLOSED
    if (buy_data.length) {
      card_to_buyer(buy_data[0]);
    } else {
      //RETURN CARD TO OWNER
      return_card(auction);
    }
    await Auctions.findById(auction)
      .then((auction) => {
        auction.is_opened = false;
        auction.buyer_id = buy_data.length > 0 ? buy_data[0].owner_id : null;
        auction.save();
      })
      .catch((err) => {
        if (err) throw err;
      });
  }
};
