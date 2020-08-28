const mongoose_connect = require("./mongose_connect.js");
const parsing = require("./controllers/parsing_controller.js");
const init_groups = require("./controllers/init_project_controller.js");
const Groups = require("./models/Groups");
const Users = require("./models/Users");
const Settings = require("./models/Settings");
const bcrypt = require("bcrypt");

mongoose_connect();

async function init() {
  await init_groups.create();
  await parsing.episodes_create();
  parsing.locations_create();
  setTimeout(parsing.cards_create, 7000);
}
init();
