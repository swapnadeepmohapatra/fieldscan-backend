const Place = require("../models/place");
const _ = require("lodash");
const fs = require("fs");

exports.getPlaceById = (req, res, next, id) => {
  Place.findById(id)
    .exec((error, place) => {
      if (error) {
        return res.staus(400).json({
          error: "Place not found",
        });
      }
      req.place = place;
      next();
    });
};

exports.createPlace = (req, res) => {
  const place = new Place(req.body);

  place.save((error, place) => {
    if (error) {
      return res.status(400).json({
        error: "Saving place failed",
      });
    }
    return res.json(place);
  });
};

exports.getPlace = (req, res) => {
  return res.json(req.place);
};

exports.deletePlace = (req, res) => {
  const place = req.place;
  place.remove((error, deletedPlace) => {
    if (error) {
      return res.status(400).json({
        error: "Place couldn't be deleted",
      });
    }
    res.json({
      message: `Successfully deleted ${deletedPlace.name}`,
    });
  });
};

exports.updatePlace = (req, res) => {
  const place = req.place;
  
  place.save((error, updatedPlace) => {
    if (error) {
      return res.status(400).json({
        error: error,
      });
    }
    res.json(updatedPlace);
  });
};

exports.getAllPlaces = (req, res) => {
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  Place.find()
    .sort([[sortBy, "asc"]])
    .exec((error, places) => {
      if (error) {
        return res.status(400).json({
          error: error,
        });
      }
      res.json(places);
    });
};

exports.addVisit = (req, res, next) => {
  let myOperations = req.body.order.places.map((place) => {
    return {
      updateOne: {
        filter: { _id: place._id },
        update: { $inc: { visits: +1 } },
      },
    };
  });

  Place.bulkWrite(myOperations, {}, (err, places) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    next();
  });
};
