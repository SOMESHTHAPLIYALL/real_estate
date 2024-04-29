import React from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const AdminHeader = () => {
  return (
    <header className="bg-blue-500 p-4 sticky top-0 z-50">
      <nav className="container  flex justify-between items-center">
        <h1 className="text-white text-4xl font-bold flex justify-center items-center">
          <FaHome /> Blossom Properties
        </h1>
        <div className="flex gap-20 font-bold text-2xl ">
          <Link to="/adminagents" className="text-white hover:underline">
            Agents
          </Link>

          <Link to="/adminsellers" className="text-white hover:underline">
            Sellers
          </Link>
          <Link to="/adminBuyer" className="text-white hover:underline">
            Buyers
          </Link>

          <Link to="/" className="text-white hover:underline">
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;
