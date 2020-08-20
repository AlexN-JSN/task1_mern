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
};
