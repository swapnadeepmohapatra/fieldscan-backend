const User = require("../models/user");
const Visit = require("../models/visit");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        message: "No user found",
      });
    }

    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (error, user) => {
      if (error) {
        return res.status(400).json({
          message: "Updating not successful",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    }
  );
};

exports.getQRCode = (req, res) => {
  req.profile.salt = undefined;
  req.profile.visits = undefined;
  req.profile.role = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  req.profile.__v = undefined;
  res.json(req.profile);
};

exports.userVisitList = (req, res) => {
  Visit.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((error, visit) => {
      if (error) {
        return res.status(400).json({
          message: "No vivit in this account",
        });
      }
      res.json(visit);
    });
};

exports.pushVisitInList = (req, res, next) => {
  let visits = [];
  req.body.visit.places.forEach((element) => {
    visits.push({
      _id: element._id,
      name: element.name,
      description: element.description,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { visits: visits } },
    { new: true },
    (error, visits) => {
      if (error) {
        return res.status(400).json({
          error: "Unable to save purchase",
        });
      }
      next();
    }
  );
};
