module.exports = function (app) {
  //parsing data from API
  // const parsing_items = require("./parsing");
  // parsing_items(app);

  //register user
  const register = require("./auth");
  register(app);

  //group management
  const groups_managements = require("./groups");
  groups_managements(app);

  const auctions = require("./auctions");
  auctions(app);

  //locations
  const locations = require("./locations");
  locations(app);

  //episodes
  const episodes = require("./episodes");
  episodes(app);

  //settings
  const settings = require("./settings");
  settings(app);

  //cards
  const cards = require("./cards");
  cards(app);
};
