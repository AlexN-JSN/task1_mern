let Users = require("../../models/Users.js");
let check_by_id = require("../../helpers/is_admin/check_by_id.js");

module.exports = async function (auction_data) {
  let result = await check_by_id(auction_data.owner_id);
  //check is admin card owner
  if (!result[0].groups_list.some((e) => e.name === "Admin")) {
    //remove card from owner
    await Users.findById(auction_data.owner_id)
      .then((user) => {
        if (!user) throw "Owner not found!";
        //find card in cards array
        let card_index = user.blocked_cards.indexOf(auction_data.card_id);
        if (card_index >= 0) {
          //remove card_id from cards array
          user.blocked_cards.splice(card_index, 1);

          //add card_id to blocked_cards array
          user.markModified("blocked_cards");
          user.save();
        } else {
          throw "Error, owner doesnt have this card!";
          return false;
        }
      })
      .catch((err) => {
        if (err) throw err;
      });
  }
  //add Card to owner
  await Users.findById(auction_data.buyer_id)
    .then((user) => {
      if (!user) throw "Buyer not found!";

      user.cards.push(auction_data.card_id);
      user.markModified("cards");
      user.save();
    })
    .catch((err) => {
      if (err) throw err;
    });
};
