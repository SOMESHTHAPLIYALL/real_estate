const express = require("express");
const connectDB = require("./backend/config/db.js");
const cors = require("cors");
const bodyParser = require("body-parser");

const BuyerRoutes = require("./backend/routes/BuyerRoutes.js");
const SellerRoutes = require("./backend/routes/SellerRoutes.js");
const AgentRoutes = require("./backend/routes/AgentRoutes.js");

connectDB();
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/api/v1/buyer", BuyerRoutes);
app.use("/api/v1/seller", SellerRoutes);
app.use("/api/v1/agent", AgentRoutes);

app.listen(8080, () => {
  console.log("Server Working");
});
