const express = require("express");
const router = express.Router();

const {
  isAdmin,
  isAuthenticated,
  isSignedIn,
  isSuperAdmin,
} = require("../controllers/auth");
const { getUserById, pushVisitInList } = require("../controllers/user");
const { addVisit } = require("../controllers/product");
const {
  createVisit,
  getAllVsits,
  getVisitById,
} = require("../controllers/visit");

router.param("userId", getUserById);
router.param("orderId", getOrderById);

router.post(
  "/visit/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushVisitInList,
  addVisit,
  createVisit
);

router.get(
  "/visit/all/:userId",
  isSignedIn,
  isAuthenticated,
  isSuperAdmin,
  getAllVsits
);

module.exports = router;
