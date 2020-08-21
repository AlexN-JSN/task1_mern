module.exports = function (app) {
  const controller = require("../controllers/auctions_controller.js");

  app.route("/auctions").get(controller.index).post(controller.create);
  //app.route("/auctions/:auctionId").post(controller.auth);
};
