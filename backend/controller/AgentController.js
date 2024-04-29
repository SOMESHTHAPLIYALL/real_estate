const AgentModel = require("../models/AgentModel");

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
    const exisitingUser = await AgentModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "User already exisits",
      });
    }

    //save new user
    const user = new AgentModel({ username, email, password, dob, contact });
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
    const user = await AgentModel.findOne({ email });
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
    const users = await AgentModel.find({});
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

exports.getSingleUser = async (req, res) => {
  try {
    const { agentID } = req.body;

    const agent = await AgentModel.findById(agentID);
    if (!agent) {
      return res.status(400).send({
        message: "Error getting agent",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Fetched sucessfully",
      success: true,
      agent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error fetching user",
      success: false,
      error,
    });
  }
};

exports.updateRatings = async (req, res) => {
  try {
    const { agentID, rating } = req.body;
    const agent = await AgentModel.findByIdAndUpdate(agentID, {
      rating: rating,
    });
    if (!agent) {
      return res.status(400).send({
        message: "Error creating rating",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Succesfull created rating",
      success: true,
      agent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error giving rating",
      success: false,
      error,
    });
  }
};

exports.sendProperty = async (req, res) => {
  try {
    const {
      agentID,
      sellername,
      propertyname,
      image,
      description,
      price,
      location,
      sellerID,
      propertyID,
      available,
    } = req.body;
    const agent = await AgentModel.findByIdAndUpdate(
      agentID,
      {
        $push: {
          properties: {
            sellername: sellername,
            propertyname: propertyname,
            image: image,
            description: description,
            price: price,
            location: location,
            sellerID: sellerID,
            propertyID: propertyID,
            available: available,
          },
        },
      },
      { new: true }
    );
    if (!agent) {
      return res.status(400).send({
        message: "Error",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Property inserted succesfully",
      success: true,
      agent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error",
      success: false,
      error,
    });
  }
};

exports.createReviews = async (req, res) => {
  try {
    const { id, review } = req.body;
    console.log(id);
    console.log(review);
    const agent = await AgentModel.findByIdAndUpdate(
      id,
      {
        $push: {
          reviews: {
            review: review,
          },
        },
      },
      { new: true }
    );
    if (!agent) {
      return res.status(400).send({
        message: "Error creating review",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Created succesfully",
      success: true,
      agent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error creating review",
      success: false,
      error,
    });
  }
};

exports.createListing = async (req, res) => {
  try {
    const { propertyID, agentID, list } = req.body;
    console.log(list);

    const agent = await AgentModel.findOneAndUpdate(
      {
        _id: agentID,
        "properties._id": propertyID,
      },
      {
        $set: {
          "properties.$.show": list,
        },
      },
      {
        new: true,
      }
    );

    if (!agent) {
      return res.status(400).send({
        message: "Cannot set property",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Succes",
      success: true,
      agent,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const agent = await AgentModel.findByIdAndDelete(id);
    if (!agent) {
      return res.status(400).send({
        message: "Error",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Success",
      success: true,
      agent,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.ownProp = async (req, res) => {
  try {
    const {
      id,
      image,
      propertyname,
      description,
      price,
      location,
      sellerName,
      available,
    } = req.body;

    const agent = await AgentModel.findByIdAndUpdate(
      id,
      {
        $push: {
          ownprop: {
            image: image,
            propertyname: propertyname,
            description: description,
            price: price,
            location: location,
            sellerName: sellerName,
            available: available,
          },
        },
      },
      { new: true }
    );
    if (!agent) {
      return res.status(400).send({
        message: "Error",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Success",
      success: true,
      agent,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error",
      success: false,
      error,
    });
  }
};

exports.deleteProp = async (req, res) => {
  try {
    const { id, propID } = req.body;
    const agent = await AgentModel.findByIdAndUpdate(
      id,
      {
        $pull: { ownprop: { _id: propID } },
      },
      { new: true }
    );
    if (!agent) {
      return res.status(400).send({
        message: "Error",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Success",
      success: true,
      agent,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error",
      success: false,
      error,
    });
  }
};

exports.updateProp = async (req, res) => {
  try {
    const {
      agentID,
      propertyID,
      image,
      propertyName,
      description,
      price,
      location,
      available,
    } = req.body;

    const agent = await AgentModel.findOneAndUpdate(
      { _id: agentID, "ownprop._id": propertyID },
      {
        $set: {
          "ownprop.$": {
            image: image,
            propertyname: propertyName,
            description: description,
            price: price,
            location: location,
            available: available,
          },
        },
      },
      { new: true }
    );

    if (!agent) {
      return res.status(400).send({
        message: "Error in finding",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Updated",
      success: true,
      agent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error",
      success: false,
      error,
    });
  }
};

exports.updateSellerProp = async (req, res) => {
  try {
    const {
      agentID,
      id,
      image,
      propertyName,
      description,
      price,
      location,
      sellername,
      sellerID,
      propID,
      available,
    } = req.body;

    const agent = await AgentModel.findOneAndUpdate(
      { _id: agentID, "properties._id": id },
      {
        $set: {
          "properties.$.image": image,
          "properties.$.propertyname": propertyName,
          "properties.$.description": description,
          "properties.$.price": price,
          "properties.$.location": location,
          "properties.$.sellername": sellername,
          "properties.$.propertyID": propID, // Update propertyID here
          "properties.$.sellerID": sellerID,
          "properties.$.available": available,
        },
      },
      { new: true }
    );

    if (!agent) {
      return res.status(400).send({
        message: "Error in finding",
        success: false,
      });
    }

    return res.status(200).send({
      message: "Updated",
      success: true,
      agent,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error",
      success: false,
      error,
    });
  }
};
