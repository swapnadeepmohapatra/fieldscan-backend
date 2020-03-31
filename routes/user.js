const express = require("express");
const router = express.Router();

const {
  getUserById,
  getQRCode,
  getUser,
  updateUser
} = require("../controllers/user");
const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.get("/user/:userId/getCode", isSignedIn, isAuthenticated, getQRCode);

module.exports = router;
