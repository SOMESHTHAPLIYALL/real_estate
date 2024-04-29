import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const SellerHeader = () => {
  return (
    <header className="bg-blue-500 p-4 sticky top-0">
      <nav className="container  flex justify-between items-center">
        <h1 className="text-white text-4xl font-bold flex justify-center items-center">
          <FaHome /> Blossom Properties
        </h1>
        <div className="flex gap-20 font-bold text-2xl ">
          <Link to="/sellerservice" className="text-white hover:underline">
            Services
          </Link>

          <Link to="/sellerallagents" className="text-white hover:underline">
            Agents
          </Link>

          <Link to="/monitor" className="text-white hover:underline">
            Monitor
          </Link>
          <Link to="/" className="text-white hover:underline">
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default SellerHeader;
