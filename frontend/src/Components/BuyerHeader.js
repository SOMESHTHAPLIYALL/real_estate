import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const BuyerHeader = () => {
  return (
    <header className="bg-blue-500 p-4 sticky top-0">
      <nav className="container  flex justify-between items-center">
        <h1 className="text-white text-4xl font-bold flex justify-center items-center">
          <FaHome /> Blossom Properties
        </h1>
        <div className="flex gap-20 font-bold text-2xl ">
          <Link to="/buyersproperties" className="text-white hover:underline">
            Properties
          </Link>
          <Link to="/savedproperties" className="text-white hover:underline">
            Saved Properties
          </Link>
          <Link to="/mortage" className="text-white hover:underline">
            Mortgage
          </Link>
          <Link to="/buyerallagents" className="text-white hover:underline">
            Agents
          </Link>
          <Link to="/" className="text-white hover:underline">
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default BuyerHeader;
