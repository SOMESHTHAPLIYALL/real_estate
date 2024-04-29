const BuyerModel = require("../models/BuyerModel");

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
    const exisitingUser = await BuyerModel.findOne({ email });
    if (exisitingUser) {
      return res.status(401).send({
        success: false,
        message: "User already exisits",
      });
    }

    //save new user
    const user = new BuyerModel({ username, email, password, dob, contact });
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
    const user = await BuyerModel.findOne({ email });
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

exports.getSingleUser = async (req, res) => {
  try {
    const { buyerID } = req.body;
    const buyer = await BuyerModel.findById(buyerID);
    if (!buyer) {
      return res.status(400).send({
        message: "Error getting seller",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Fetched sucessfully",
      success: true,
      buyer,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error creating user",
      success: false,
      error,
    });
  }
};

exports.getAllusers = async (req, res) => {
  try {
    const users = await BuyerModel.find({});
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

exports.saveProperty = async (req, res) => {
  try {
    const {
      buyerID,
      image,
      propertyname,
      desc,
      price,
      location,
      sellername,
      available,
    } = req.body;
    const buyer = await BuyerModel.findByIdAndUpdate(
      buyerID,
      {
        $push: {
          property: {
            image: image,
            propertyname: propertyname,
            desc: desc,
            price: price,
            location: location,
            sellername: sellername,
            available: available,
          },
        },
      },
      { new: true }
    );
    if (!buyer) {
      return res.status(400).send({
        message: "Error saving",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Saved succesfully",
      success: true,
      buyer,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Property saved sucessfulyy",
      success: false,
      error,
    });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const { buyerID, propertyID } = req.body;

    const buyer = await BuyerModel.findByIdAndUpdate(
      buyerID,
      {
        $pull: { property: { _id: propertyID } },
      },
      { new: true }
    );
    if (!buyer) {
      return res.status(400).send({
        message: "Error",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Succesfully deleted",
      success: true,
      buyer,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Error",
      success: false,
      error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const buyer = await BuyerModel.findByIdAndDelete(id);
    if (!buyer) {
      return res.status(400).send({
        message: "Error",
        success: false,
      });
    }
    return res.status(200).send({
      message: "Success",
      success: true,
      buyer,
    });
  } catch (error) {
    console.log(error);
  }
};
