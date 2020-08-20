const auth = require("./../helper/jwtVerify.js");

module.exports = function (app) {
  const controller = require("../controllers/groups_controller");

  app
    .get("/groups_managements", auth, controller.index)
    .post("/groups_managements", auth, controller.create);

  app
    .get("/groups_managements/:id", auth, controller.show)
    .put("/groups_managements/:id", auth, controller.update)
    .delete("/groups_managements/:id", auth, controller.destroy);
};
