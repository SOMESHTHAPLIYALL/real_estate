const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  property: [
    {
      image: {
        type: String,
      },
      propertyname: {
        type: String,
      },
      desc: {
        type: String,
      },
      price: {
        type: String,
      },
      location: {
        type: String,
      },
      numberofsave: {
        type: Number,
        default: 0,
      },
      numberofview: {
        type: Number,
        default: 0,
      },
      available: {
        type: String,
      },
    },
  ],
});

const Seller = mongoose.model("Seller", sellerSchema);
module.exports = Seller;
