const express = require("express");
const router = express.Router();

const {
  createPlace,
  deletePlace,
  getPlace,
  getPlaceById,
  updatePlace,
} = require("../controllers/place");
const {
  isSignedIn,
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
} = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("placeId", getPlaceById);

router.post(
  "/place/create/:userId",
  isSignedIn,
  isAuthenticated,
  isSuperAdmin,
  createPlace
);
router.get("/place/:placeId", getPlace);

router.put("/place/:placeId/:userId", updatePlace);

router.delete(
  "/place/:palceId/:userId",
  isSignedIn,
  isAuthenticated,
  isSuperAdmin,
  deletePlace
);

router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

module.exports = router;
