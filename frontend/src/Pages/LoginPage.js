import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");

  const handleLogin = async () => {
    if (!email || !password || !role) {
      toast.error("Please fill all fields");
    }
    if (role === "Admin") {
      if (email === "admin@gmail.com" && password === "admin123") {
        navigate("/adminagents");
      } else {
        alert("Wrong credentials");
      }
    } else if (role === "Buyer") {
      try {
        const { data } = await axios.post("/api/v1/buyer/login", {
          email: email,
          password: password,
        });
        if (data?.success) {
          localStorage.setItem("buyerID", data?.user._id);
          navigate("/buyerallproperties");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (role === "Seller") {
      try {
        const { data } = await axios.post("/api/v1/seller/login", {
          email: email,
          password: password,
        });
        if (data?.success) {
          localStorage.setItem("sellerID", data?.user._id);
          localStorage.setItem("sellername", data?.user.username);
          navigate("/sellerservice");
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (role === "Agent") {
      try {
        const { data } = await axios.post("/api/v1/agent/login", {
          email: email,
          password: password,
        });
        if (data?.success) {
          localStorage.setItem("agentID", data?.user._id);
          localStorage.setItem("agentname", data?.user.username);
          navigate("/agentservice");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-blue-200 p-4 ">
        <div className="content p-8 flex justify-between items-center h-[80vh]">
          <div className="box flex bg-white flex-col rounded-xl shadow-xl  p-8 bg-opacity-20 backdrop-blur-sm gap-10 ml-36  w-[500px] mt-32">
            <h1 className="place-self-center font-bold text-7xl underline underline-offset-2">
              Login
            </h1>
            <input
              className="p-4 rounded-xl outline-none text-lg"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="p-4 rounded-xl outline-none text-lg"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className=" flex justify-evenly font-bold items-center">
              <label className="text-xl" htmlFor="role">
                Select Role:{" "}
              </label>
              <select
                className="p-4 rounded-xl outline-none w-72 text-lg"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" hidden>
                  Select Role
                </option>
                <option value="Admin">Admin</option>
                <option value="Buyer">Buyer</option>
                <option value="Seller">Seller</option>
                <option value="Agent">Agent</option>
              </select>
            </div>

            <button
              className="bg-violet-500 cursor-pointer p-4 rounded-xl hover:bg-violet-400 w-56 font-bold text-lg place-self-center"
              onClick={handleLogin}
            >
              LOGIN
            </button>
            <h1 className="place-self-center font-semibold text-2xl">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="underline underline-offset-2 font-bold text-red-400 cursor-pointer"
              >
                Register here
              </Link>
            </h1>
          </div>
          <div className="image">
            <img
              className="h-[500px]"
              src="https://animationexplainers.com/wp-content/uploads/2021/07/p5-bg1.png"
              alt="Building"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
