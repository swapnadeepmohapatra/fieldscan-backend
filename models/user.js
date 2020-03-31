const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 32,
      trim: true
    },
    lastname: {
      type: String,
      maxLength: 32,
      trim: true
    },
    aadhar: {
      type: Number,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    encry_password: {
      type: String,
      required: true
    },
    visits: {
      type: Array,
      default: []
    },
    role: {
      type: Number,
      default: 0
    },
    salt: String
  },
  { timestamps: true }
);

UserSchema.virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema.methods = {
  securePassword: function(plainPassword) {
    if (!plainPassword) return "";
    try {
      const hash = crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
      return hash;
    } catch (error) {
      return "";
    }
  },

  authenticate: function(plainPassword) {
    return this.securePassword(plainPassword) === this.encry_password;
  }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
