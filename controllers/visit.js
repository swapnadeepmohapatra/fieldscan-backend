const  {  Visit }= require("../models/visit");

exports.getVisitById = (req, res, next, id) => {
  Visit.findById(id)
    .exec((error, visit) => {
      if (error) {
        res.statis(400).json({
          error: "No visit found",
        });
      }
      req.visit = visit;
      next();
    });
};

exports.createVisit = (req, res) => {
  req.body.visit.user = req.profile;
  const visit = new Visit(req.body.visit);

  visit.save((error, visit) => {
    if (error) {
      return res.status(400).json({
        error: error,
      });
    }

    res.json(visit);
  });
};

exports.getAllVsits = (req, res) => {
  Visit.find()
    .populate("user", "_id name")
    .exec((error, visit) => {
      if (error) {
        return res.status(400).json({
          error: "No visits found",
        });
      }
      res.json(visit);
    });
};
