const Bets = require("./../models/Bets.js");

//Show all bets
//Access: private
exports.index = function (req, res) {
  Bets.find({}, function (err, bet) {
    if (err) res.send(err);
    res.json(bet);
  });
};

//create new bet
//Access: public
exports.create = function (req, res) {
  const newBet = new Bets(req.body);
  newBet.save(function (err, bet) {
    if (err) res.send(err);
    res.json(bet);
  });
};
