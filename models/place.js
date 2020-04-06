const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32
    },
    address: {
      type: String,
      trim: true,
      required: true,
      maxLength: 2000
    },
    descripiton: {
      type: String,
      trim: true,
      required: true,
      maxLength: 5000,
    },
    visits: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Place = mongoose.model("Place", PlaceSchema);
module.exports = Place;
