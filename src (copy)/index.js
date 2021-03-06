const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const path = require("path");
const mongoose_connect = require("./mongose_connect.js");
require("./services/auction/auction_checker.js");

const routes = require("./routes");
const cors = require("./cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "public")));

cors(app);
routes(app);
mongoose_connect();

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
