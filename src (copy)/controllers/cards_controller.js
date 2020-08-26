const e = require("express");
const mongoose = require("mongoose");
const path = require("path");
//models
const Cards = require("../models/Cards");
const Episodes = require("../models/Episodes");
const Locations = require("../models/Locations");
//helpers
const settings = require("../helpers/settings");
const validations = require("../helpers/validation_functions");

//Show all cards
//Access: public
exports.index = function (req, res) {
  Cards.aggregate([])
    .lookup({
      from: "locations",
      localField: "locations",
      foreignField: "_id",
      as: "locations_list",
    })
    .lookup({
      from: "episodes",
      localField: "episodes",
      foreignField: "_id",
      as: "episodes_list",
    })
    .project({
      _id: 1,
      name: 1,
      gender: 1,
      species: 1,
      image: 1,
      status: 1,
      person_type: 1,
      "locations_list._id": 1,
      "locations_list.name": 1,
      "episodes_list._id": 1,
      "episodes_list.name": 1,
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      if (err)
        res.status(404).json({
          message: "Cards not found",
        });
    });
};

//create new card
//Access: private
exports.create = async function (req, res) {
  if (await settings.can_create_cards()) {
    let image;
    if (typeof req.file !== "undefined") {
      const remove = path.join(__dirname, "..", "..", "public");
      const relpath = req.file.path.replace(remove, "");
      image = relpath.split("\\").join("/");
    } else {
      res.status(400).json("Image not uploaded");
      return;
    }

    if (!(await checkEpisodes(res, req.body.episodes))) {
      return;
    }

    if (!(await checkLocations(res, req.body.locations))) {
      return;
    }

    const name = req.body.name;
    const gender = req.body.gender;
    const species = req.body.species;
    const episodes = req.body.episodes;
    const locations = req.body.locations;
    const status = req.body.status;
    const person_type = req.body.person_type;

    const newCard = new Cards({
      name,
      gender,
      species,
      image,
      episodes,
      locations,
      status,
      person_type,
    });

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
exports.show = async function (req, res) {
  Cards.aggregate([])
    .match({ _id: mongoose.Types.ObjectId(req.params.id) })
    .lookup({
      from: "locations",
      localField: "locations",
      foreignField: "_id",
      as: "locations_list",
    })
    .lookup({
      from: "episodes",
      localField: "episodes",
      foreignField: "_id",
      as: "episodes_list",
    })
    .project({
      _id: 1,
      name: 1,
      gender: 1,
      species: 1,
      image: 1,
      status: 1,
      person_type: 1,
      "locations_list._id": 1,
      "locations_list.name": 1,
      "episodes_list._id": 1,
      "episodes_list.name": 1,
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      if (err)
        res.status(404).json({
          message: `Card ${res.params.id} not found`,
        });
    });
};

//Update card by ID
//Access: private
exports.update = function (req, res) {
  Cards.findById(req.params.id, async (err, card) => {
    if (err) res.send(err);

    if (typeof req.file !== "undefined") {
      const remove = path.join(__dirname, "..", "..", "public");
      const relpath = req.file.path.replace(remove, "");
      card.image = relpath.split("\\").join("/");
    } else {
      res.status(400).json("Image not uploaded");
      return;
    }

    if (!(await checkEpisodes(res, req.body.episodes))) {
      return;
    }

    if (!(await checkLocations(res, req.body.locations))) {
      return;
    }

    card.name = req.body.name;
    card.gender = req.body.gender;
    card.species = req.body.species;
    card.episodes = req.body.episodes;
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
  Cards.findByIdAndDelete(req.params.id, function (err) {
    if (err) res.send(err);
    res.json({ message: `Element id: ${req.params.id} successfull deleted` });
  });
};

//check episode items for existing
async function checkEpisodes(res, items_id_array) {
  if (!validations.valid_ids(items_id_array)) {
    res.status(400).json({
      message: `Invalid episode id_format`,
    });
    return false;
  } else {
    let episodes = await Episodes.find({
      _id: validations.remove_duplicates(items_id_array),
    }).select("_id");
    if (items_id_array.length !== episodes.length) {
      res.status(404).json({
        message: `Element doesnt exist or episodes array have duplicates`,
      });
      return false;
    }
    return true;
  }
}

//check location items for existing
async function checkLocations(res, items_id_array) {
  if (!validations.valid_ids(items_id_array)) {
    res.status(400).json({
      message: `Invalid location id_format`,
    });
    return false;
  } else {
    let locations = await Locations.find({
      _id: validations.remove_duplicates(items_id_array),
    }).select("_id");
    if (items_id_array.length !== locations.length) {
      res.status(404).json({
        message: `Element doesnt exist or locations array have duplicates`,
      });
      return false;
    }
    return true;
  }
}
