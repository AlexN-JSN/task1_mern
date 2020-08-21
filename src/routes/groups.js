<<<<<<< HEAD
const auth = require("../helpers/auth.js");
const is_admin = require("../helpers/is_admin.js");
=======
const auth = require("./../helper/jwtVerify.js");
>>>>>>> 9c1fe6ba8a3d63ec36bfcf5ab583325510bcbad0

module.exports = function (app) {
  const controller = require("../controllers/groups_controller");

  app
<<<<<<< HEAD
    .get("/groups_managements", auth, is_admin, controller.index)
    .post("/groups_managements", auth, is_admin, controller.create);

  app
    .get("/groups_managements/:id", auth, is_admin, controller.show)
    .put("/groups_managements/:id", auth, is_admin, controller.update)
    .delete("/groups_managements/:id", auth, is_admin, controller.destroy);
=======
    .get("/groups_managements", auth, controller.index)
    .post("/groups_managements", auth, controller.create);

  app
    .get("/groups_managements/:id", auth, controller.show)
    .put("/groups_managements/:id", auth, controller.update)
    .delete("/groups_managements/:id", auth, controller.destroy);
>>>>>>> 9c1fe6ba8a3d63ec36bfcf5ab583325510bcbad0
};
