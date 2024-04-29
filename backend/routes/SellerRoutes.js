const express = require("express");
const {
  getAllusers,
  registerController,
  loginController,
  createProperty,
  getSingleUser,
  deleteProperty,
  numberOfSave,
  deleteUser,
  getProp,
  numberOfViews,
} = require("../controller/SellerController.js");

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/get-Users", getAllusers);

router.post("/createproperty", createProperty);

router.post("/singleSeller", getSingleUser);

router.post("/deleteproperty", deleteProperty);

router.post("/save", numberOfSave);

router.post("/singleprop", getProp);

router.post("/view", numberOfViews);
module.exports = router;
