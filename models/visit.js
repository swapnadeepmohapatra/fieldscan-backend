const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema;

const VisitSchema = new Schema(
  {
    place: {
      type: ObjectId,
      ref: "Place",
    },
    transaction_id: {},
    amount: {
      type: Number,
    },
    user: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Visit = mongoose.model("Visit", VisitSchema);

module.exports = { Visit };
