import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [dob, setDob] = useState("");
  const [contact, setContact] = useState("");
  const handleSignUp = async () => {
    if (!email || !password || !role) {
      toast.error("Please fill all fields");
    }
    if (role === "Buyer") {
      try {
        const { data } = await axios.post("/api/v1/buyer/register", {
          username: name,
          email: email,
          password: password,
          dob: dob,
          contact: contact,
        });
        if (data?.success) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (role === "Seller") {
      try {
        const { data } = await axios.post("/api/v1/seller/register", {
          username: name,
          email: email,
          password: password,
          dob: dob,
          contact: contact,
        });
        if (data?.success) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (role === "Agent") {
      try {
        const { data } = await axios.post("/api/v1/agent/register", {
          username: name,
          email: email,
          password: password,
          dob: dob,
          contact: contact,
        });
        if (data?.success) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Toaster />
      <div className="h-screen bg-white p-4 ">
        <div className="content p-8 flex justify-between items-center h-[80vh]">
          <div className="box flex bg-blue-400 flex-col rounded-xl shadow-xl  p-8 bg-opacity-20 backdrop-blur-sm gap-10  w-[700px] mt-32">
            <h1 className="place-self-center font-bold text-7xl underline underline-offset-2">
              SignUp
            </h1>
            <div className="flex justify-between items-center">
              <input
                className="p-4 rounded-xl outline-none text-lg w-[300px]"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
              <input
                className="p-4 rounded-xl outline-none text-lg w-[300px]"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>
            <div className="justify-between items-center flex">
              <input
                className="p-4 rounded-xl outline-none text-lg w-[300px]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <input
                className="p-4 rounded-xl outline-none text-lg w-[300px]"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                type="date"
              />
            </div>
            <div className="flex justify-between items-center">
              <input
                className="p-4 rounded-xl outline-none text-lg w-[300px]"
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
              <div className="flex justify-evenly font-bold items-center">
                <select
                  className="p-4 rounded-xl outline-none  text-lg w-[300px]"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" hidden>
                    Select Role
                  </option>
                  <option value="Buyer">Buyer</option>
                  <option value="Seller">Seller</option>
                  <option value="Agent">Agent</option>
                </select>
              </div>
            </div>

            <button
              className="bg-violet-500 cursor-pointer p-4 rounded-xl hover:bg-violet-400 w-56 font-bold text-lg place-self-center"
              onClick={handleSignUp}
            >
              SignUp
            </button>
            <h1 className="place-self-center font-semibold text-2xl">
              Already have an account?{" "}
              <Link
                to="/"
                className="underline underline-offset-2 font-bold text-red-400 cursor-pointer"
              >
                Login here
              </Link>
            </h1>
          </div>
          <div className="image">
            <img
              className="h-[400px]"
              src="https://media.istockphoto.com/id/1263319152/vector/woman-holding-keys-from-house-for-sale-and-smiling.jpg?s=612x612&w=0&k=20&c=P3HPAsY-YxeqRLfLzX0l1cnqGZYtuISgfCmbG1NRfNg="
              alt="Building"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
