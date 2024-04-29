const express = require("express");
const {
  getAllusers,
  registerController,
  loginController,
  updateRatings,
  sendProperty,
  createReviews,
  getSingleUser,
  createListing,
  deleteUser,
  ownProp,
  deleteProp,
  updateProp,
  updateSellerProp,
} = require("../controller/AgentController");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/get-Users", getAllusers);

router.post("/updaterating", updateRatings);

router.post("/sendproperty", sendProperty);

router.post("/givereview", createReviews);

router.post("/getSingleUser", getSingleUser);

router.post("/createList", createListing);

router.post("/delete", deleteUser);

router.post("/createProp", ownProp);

router.post("/delProp", deleteProp);

router.post("/update", updateProp);

router.post("/updateseller", updateSellerProp);

module.exports = router;
