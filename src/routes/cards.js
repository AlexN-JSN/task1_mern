const auth = require("../helpers/auth.js");
const is_admin = require("../helpers/is_admin.js");

module.exports = function (app) {
  const controller = require("../controllers/cards_controller");

  app
    .get("/cards", auth, controller.index)
    .post("/cards", auth, is_admin, controller.create);
  app
    .get("/cards/:id", auth, controller.show)
    .put("/cards/:id", auth, is_admin, controller.update)
    .delete("/cards/:id", auth, is_admin, controller.destroy);
};
