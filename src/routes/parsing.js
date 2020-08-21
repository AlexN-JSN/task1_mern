module.exports = function (app) {
  const controller = require("../controllers/parsing_controller");

  app
    .route("/parsing_cards")
    .get(controller.cards_index)
    .post(controller.cards_create);
  app
    .route("/parsing_locations")
    .get(controller.locations_index)
    .post(controller.locations_create);
  app
    .route("/parsing_episodes")
    .get(controller.episodes_index)
    .post(controller.episodes_create);
};
