const Cards = require("../models/Cards");
const Episodes = require("../models/Episodes");
const Locations = require("../models/Locations");
const settings = require("../helpers/settings");
const e = require("express");

//Show all cards
//Access: public
exports.index = function (req, res) {
  Cards.find({}, function (err, card) {
    if (err) res.send(err);
    res.json(card);
  });
};

//create new card
//Access: private
exports.create = async function (req, res) {
  if (await settings.can_create_cards()) {
    const newCard = new Cards(req.body);
    newCard.save(function (err, card) {
      if (err) res.send(err);
      res.json(card);
    });
  } else {
    res.status(401).json({
      message:
        "You cannot create a new card until all original cards have been sold",
    });
  }
};

//Show card by ID
//Access: public
exports.show = function (req, res) {
  Cards.findById(req.params.id, function (err, card) {
    if (err) res.send(err);
    res.json(card);
  });
};

//Update card by ID
//Access: private
exports.update = function (req, res) {
  Cards.findById(req.params.id, async (err, card) => {
    if (err) res.send(err);
    card.name = req.body.name;
    card.gender = req.body.gender;
    card.species = req.body.species;
    card.image = req.body.image;
    if (!(await checkIdArrays(res, "episodes", req.body.episodes))) {
      return;
    }
    card.episodes = req.body.episodes;

    if (!(await checkIdArrays(res, "locations", req.body.locations))) {
      return;
    }
    card.locations = req.body.locations;
    card.status = req.body.status;
    card.person_type = req.body.person_type;
    card
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.send(err);
      });
  });
};

//remove card by ID
//Access: private
exports.destroy = function (req, res) {
  console.log(req.params.id);
  Cards.findByIdAndDelete(req.params.id, function (err) {
    if (err) res.send(err);
    res.json({ message: `Element id: ${req.params.id} successfull deleted` });
  });
};

//check items for existing
async function checkIdArrays(res, field_name, items_id_array) {
  for await (const item_id of items_id_array) {
    //check to valid item id format
    if (!item_id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(404).json({
        message: `Invalid id_format in ${field_name} array`,
      });
      return false;
    }

    //check existing item
    let check_id = null;
    if (field_name == "locations") {
      check_id = await getLocation(item_id);
    } else {
      check_id = await getEpisode(item_id);
    }
    if (check_id === null) {
      res.status(404).json({
        message: `A non-existent ${field_name} is set, please create a new one.`,
      });
      return false;
    }
  }
  return true;
}

//check episode id in db
async function getEpisode(episode_id) {
  let episode = await Episodes.findOne({ _id: episode_id });
  return episode;
}

//check location id in db
async function getLocation(location_id) {
  let location = await Locations.findOne({ _id: location_id });
  return location;
}
