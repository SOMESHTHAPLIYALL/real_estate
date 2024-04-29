const SellerModel = require("../models/SellerModel");

//create user register user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password, dob, contact } = req.body;
    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Fill all fields",
      });
    }
    //exisiting user
    const exisitingUser = await SellerModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "User already exisits",
      });
    }

    //save new user
    const user = new SellerModel({ username, email, password, dob, contact });
    await user.save();
    return res.status(201).send({
      success: true,
      message: "New User Created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error In Register callback",
      success: false,
      error,
    });
  }
};

//login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await SellerModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not registerd",
      });
    }
    //password

    if (password != user.password) {
      return res.status(401).send({
        success: false,
        message: "Invlaid username or password",
      });
    }
    return res.status(200).send({
      success: true,
      messgae: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Login Callcback",
      error,
    });
  }
};

exports.getAllusers = async (req, res) => {
  try {
    const users = await SellerModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Get ALl Users",
      error,
    });
  }
};

exports.getProp = async (req, res) => {
  try {
    const { sellerID, propertyID } = req.body;

    // Find the seller by ID
    const seller = await SellerModel.findById(sellerID);

    if (!seller) {
      return res.status(404).send({
        success: false,
        message: "Seller not found",
      });
    }

    // Find the specific property within the seller's properties array
    const property = seller.property.find((prop) => prop._id == propertyID); // Convert propertyID to ObjectId if needed

    if (!property) {
      return res.status(404).send({
        success: false,
        message: "Property not found for this seller",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Property found successfully",
      property,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting property",
      error,
    });
  }
};
exports.createProperty = async (req, res) => {
  try {
    const { sellerID, propertyname, desc, image, price, location, available } =
      req.body;
    const seller = await SellerModel.findByIdAndUpdate(
      sellerID,
      {
        $push: {
          property: {
            image: image,
            propertyname: propertyname,
            desc: desc,
            price: price,
            location: location,
            available: available,
          },
        },
      },
      { new: true }
    );
    await seller.save();
    return res.status(200).send({
      message: "Property created sucessfully",
      success: true,
      seller,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error creating property",
      success: false,
      error,
    });
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const { sellerID } = req.body;
    const seller = await SellerModel.findById(sellerID);
    if (!seller) {
      return res.status(400).send({
        message: "Error getting seller",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Fetched sucessfully",
      success: true,
      seller,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error creating user",
      success: false,
      error,
    });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const { sellerID, propertyID } = req.body;
    if (!sellerID || !propertyID) {
      return res.status(400).json({
        success: false,
        message: "Both seller ID and property ID are required for deletion.",
      });
    }
    const seller = await SellerModel.findByIdAndUpdate(
      sellerID,
      {
        $pull: { property: { _id: propertyID } },
      },
      { new: true }
    );
    if (!seller) {
      return res.status(400).send({
        message: "Seller not found",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Deleted sucess",
      success: true,
      seller,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error deleting property",
      success: false,
      error,
    });
  }
};

exports.numberOfSave = async (req, res) => {
  try {
    const { sellerID, propertyID, save } = req.body;
    console.log(sellerID, propertyID, save);
    if (!sellerID || !propertyID || !save) {
      return res.status(400).send({
        message: "Missing required fields.",
        success: false,
      });
    }

    const seller = await SellerModel.findOneAndUpdate(
      {
        _id: sellerID,
        "property._id": propertyID,
      },
      {
        $set: {
          "property.$.numberofsave": save,
        },
      },
      {
        new: true,
      }
    );

    if (!seller) {
      return res.status(404).send({
        message: "Seller or property not found.",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Success",
      success: true,
      seller,
    });
  } catch (error) {
    console.error("Error updating number of saves:", error);
    return res.status(500).send({
      message: "Internal server error.",
      success: false,
      error: error.message,
    });
  }
};

exports.numberOfViews = async (req, res) => {
  try {
    const { sellerID, propertyID, view } = req.body;
    if (!sellerID || !propertyID || !view) {
      return res.status(400).send({
        message: "Missing required fields.",
        success: false,
      });
    }

    const seller = await SellerModel.findOneAndUpdate(
      {
        _id: sellerID,
        "property._id": propertyID,
      },
      {
        $set: {
          "property.$.numberofview": view,
        },
      },
      {
        new: true,
      }
    );

    if (!seller) {
      return res.status(404).send({
        message: "Seller or property not found.",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Success",
      success: true,
      seller,
    });
  } catch (error) {
    console.error("Error updating number of saves:", error);
    return res.status(500).send({
      message: "Internal server error.",
      success: false,
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const seller = await SellerModel.findByIdAndDelete(id);
    if (!seller) {
      return res.status(400).send({
        message: "Error",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Success",
      success: true,
      seller,
    });
  } catch (error) {
    console.log(error);
  }
};
