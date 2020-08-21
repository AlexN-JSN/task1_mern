const Settings = require("../models/Settings");
const settings = require("../routes/settings");

exports.default_user_group = async () => {
  let setting = await Settings.findOne({ name: "default_user_group" });
  return setting !== null ? setting.params : null;
};

exports.can_create_cards = async () => {
  let setting = await Settings.findOne({ name: "can_create_cards" });
  return setting !== null ? setting.is_active : null;
};

exports.time_token_expired = async () => {
  let setting = await Settings.findOne({ name: "time_token_expired" });
  return setting !== null ? setting.params : null;
};

exports.price_start = async () => {
  let setting = await Settings.findOne({ name: "price_start" });
  return setting !== null ? setting.params : null;
};

exports.min_bet_step = async () => {
  let setting = await Settings.findOne({ name: "min_bet_step" });
  return setting !== null ? setting.params : null;
};

exports.max_duration_auction = async () => {
  let setting = await Settings.findOne({ name: "max_duration_auction" });
  return setting !== null ? setting.params : null;
};

exports.max_bet = async () => {
  let setting = await Settings.findOne({ name: "max_bet" });
  return setting !== null ? setting.params : null;
};

exports.min_extension_time = async () => {
  let setting = await Settings.findOne({ name: "min_extension_time" });
  return setting !== null ? setting.params : null;
};
