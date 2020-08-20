const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoose_secret = require("./../vercel.json").env.MongoDB;

const routes = require("./routes");
const cors = require("./cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

cors(app);
routes(app);
const uri = mongoose_secret;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
