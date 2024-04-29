import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import SellerServicePage from "./Pages/SellerPages/SellerServicePage";
import SellerAllAgentsPage from "./Pages/SellerPages/SellerAllAgentsPage";
import BuyerAllAgents from "./Pages/BuyerPages/BuyerAllAgentsPage";
import BuyerAllProperties from "./Pages/BuyerPages/BuyerAllPropertiesPage";
import AgentServicePage from "./Pages/AgentPages/AgentServicePage";
import AgentProfilePage from "./Pages/AgentPages/AgentProfilePage";
import BuyerSavedProperties from "./Pages/BuyerPages/BuyerSavedProperties";
import MonitorPgae from "./Pages/SellerPages/MonitorPage";
import MortagePage from "./Pages/BuyerPages/MortagePage";
import AdminAllAgents from "./Pages/AdminPages/AdminAllAgents";
import AdminSellers from "./Pages/AdminPages/AdminSellers";
import AdminAllBuyers from "./Pages/AdminPages/AdminAllBuyers";
import CreateListingPage from "./Pages/AgentPages/CreateListingPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/sellerservice" element={<SellerServicePage />} />
          <Route path="/sellerallagents" element={<SellerAllAgentsPage />} />
          <Route path="/buyerallproperties" element={<BuyerAllProperties />} />
          <Route path="/buyerallagents" element={<BuyerAllAgents />} />
          <Route path="/agentservice" element={<AgentServicePage />} />
          <Route path="/agentprofile" element={<AgentProfilePage />} />
          <Route path="/buyersproperties" element={<BuyerAllProperties />} />
          <Route path="/buyerallagents" element={<BuyerAllAgents />} />
          <Route path="/savedproperties" element={<BuyerSavedProperties />} />
          <Route path="/monitor" element={<MonitorPgae />} />
          <Route path="/mortage" element={<MortagePage />} />
          <Route path="/adminagents" element={<AdminAllAgents />} />
          <Route path="/adminsellers" element={<AdminSellers />} />
          <Route path="/adminBuyer" element={<AdminAllBuyers />} />
          <Route path="/createList" element={<CreateListingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
