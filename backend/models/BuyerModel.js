const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
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
      sellername: {
        type: String,
      },
      available: {
        type: String,
      },
    },
  ],
});

const Buyer = mongoose.model("Buyer", buyerSchema);
module.exports = Buyer;
