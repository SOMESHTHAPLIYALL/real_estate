const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema({
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
  rating: {
    type: String,
  },
  properties: [
    {
      sellername: {
        type: String,
      },
      propertyname: {
        type: String,
      },
      image: {
        type: String,
      },
      description: {
        type: String,
      },
      price: {
        type: String,
      },
      location: {
        type: String,
      },
      show: {
        type: Boolean,
        default: false,
      },
      sellerID: {
        type: String,
      },
      propertyID: {
        type: String,
      },
      numberOfSave: {
        type: Number,
        default: 0,
      },
      available: {
        type: String,
      },
    },
  ],
  ownprop: [
    {
      image: {
        type: String,
      },
      propertyname: {
        type: String,
      },
      description: {
        type: String,
      },
      price: {
        type: String,
      },
      location: {
        type: String,
      },
      sellerName: {
        type: String,
      },
      available: {
        type: String,
      },
    },
  ],
  reviews: [
    {
      review: {
        type: String,
      },
    },
  ],
});

const Agent = mongoose.model("Agent", agentSchema);
module.exports = Agent;
