const auth = require("../helpers/auth.js");
const check_user_balance = require("../helpers/check_user_balance.js");

module.exports = function (app) {
  const controller = require("../controllers/bets_controller");

  app.get("/bets", auth, check_user_balance, controller.index);
  app.post("/bets", auth, check_user_balance, controller.create);
};
