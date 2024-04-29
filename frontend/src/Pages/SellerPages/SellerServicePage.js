import React, { useEffect, useState } from "react";
import axios from "axios";
import SellerHeader from "../../Components/SellerHeader";
import { IoIosAddCircle } from "react-icons/io";
import bgimage from "../../assets/bgimage.png";

const SellerServicePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [propertyName, setPropertyName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const sellerID = localStorage.getItem("sellerID");
  const [property, setProperty] = useState([]);
  const [create, setCreate] = useState("Create");
  const [agentModal, setAgentModal] = useState(false);
  const [agents, setAgents] = useState([]);
  const sellername = localStorage.getItem("sellername");
  const [propertyName1, setPropertyName1] = useState("");
  const [description1, setDescription1] = useState("");
  const [price1, setPrice1] = useState("");
  const [location1, setLocation1] = useState("");
  const [image1, setImage1] = useState(null);
  const [propertyID, setPropertyID] = useState();
  const [available, setAvailable] = useState("");
  const [available1, setAvailable1] = useState("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "propertyName") setPropertyName(value);
    else if (name === "description") setDescription(value);
    else if (name === "price") setPrice(value);
    else if (name === "location") setLocation(value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    setCreate("Creating....");
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "pmcr8gua"); // Replace with your Cloudinary upload preset
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgplustqn/image/upload",
        formData
      );
      const propertyImage = response.data.secure_url;
      console.log(response.data.secure_url);
      try {
        const { data } = await axios.post("/api/v1/seller/createproperty", {
          sellerID: sellerID,
          propertyname: propertyName,
          desc: description,
          image: propertyImage,
          price: price,
          location: location,
          available: available,
        });
        if (data?.success) {
          setCreate("Create");
          setShowModal(false);
          setDescription("");
          setImage("");
          setLocation("");
          setPrice("");
          setPropertyName("");
          setAvailable("");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
    }
  };

  const handleDelete = async (propertyID) => {
    try {
      const { data } = await axios.post("/api/v1/seller/deleteproperty", {
        sellerID,
        propertyID,
      });
      if (data?.success) {
        window.location.reload();
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAgents = async (
    image,
    propertyname,
    desc,
    price,
    location,
    id,
    available
  ) => {
    setAgentModal(true);
    try {
      const response = await axios.get("/api/v1/agent/get-Users");
      setPropertyID(id);
      setAgents(response.data.users);
      setPropertyName1(propertyname);
      setDescription1(desc);
      setPrice1(price);
      setLocation1(location);
      setImage1(image);
      setAvailable1(available);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const sendToagent = async (id) => {
    try {
      const { data } = await axios.post("/api/v1/agent/sendproperty", {
        agentID: id,
        sellername: sellername,
        propertyname: propertyName1,
        image: image1,
        description: description1,
        price: price1,
        location: location1,
        sellerID: sellerID,
        propertyID: propertyID,
        available: available1,
      });
      if (data?.success) {
        alert("Property has been sent to the agent");
        setAgentModal(false);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post("/api/v1/seller/singleSeller", {
          sellerID: sellerID,
        });
        setProperty(data?.seller?.property);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SellerHeader />
      <div
        className="h-screen "
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="content p-4 flex flex-col h-full ">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white font-bold text-xl rounded-md p-4 flex justify-center items-center gap-2 h-20 hover:bg-blue-400 cursor-pointer hover:scale-105 w-56 place-self-center"
          >
            <IoIosAddCircle />
            Create Property
          </button>

          <div className="  w-full  p-4 ">
            <div className="flex justify-start items-center flex-wrap gap-20 mt-10">
              {property.map((item) => {
                return (
                  <div className="bg-white shadow-xl p-4 w-[400px] flex flex-col gap-5 rounded-xl text-gray-500">
                    <img className="rounded-xl" src={item.image} />
                    <h1 className="font-bold text-xl">
                      Property Name: {item.propertyname}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Description: {item.desc}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Price: USD$ {item.price}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Location: {item.location}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Availablilty: {item.available}
                    </h1>
                    <div className="buttons flex justify-center items-center font-bold text-black gap-5">
                      <button
                        className="bg-green-500 p-4 w-52 rounded-xl hover:bg-green-400 cursor-pointer"
                        onClick={() =>
                          handleAgents(
                            item.image,
                            item.propertyname,
                            item.desc,
                            item.price,
                            item.location,
                            item._id,
                            item.available
                          )
                        }
                      >
                        Send
                      </button>
                      <button
                        className="bg-red-500 p-4 w-52 rounded-xl hover:bg-red-400 cursor-pointer"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="bg-gray-900 bg-opacity-75 absolute inset-0"></div>
          <div className="relative bg-white rounded-lg p-8 w-[600px] flex flex-col gap-5">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 p-4"
            >
              &#x2715;
            </button>
            <h2 className="text-2xl font-bold mb-4 ">Create Property</h2>
            <input
              type="text"
              name="propertyName"
              placeholder="Property Name"
              value={propertyName}
              onChange={handleInputChange}
              className="block w-full border-gray-300 rounded-md p-2 mb-4 outline-none bg-slate-200"
            />
            <textarea
              cols={50}
              type="text"
              name="description"
              placeholder="Description"
              value={description}
              onChange={handleInputChange}
              className="block w-full border-gray-300 rounded-md p-2 mb-4 outline-none bg-slate-200"
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={price}
              onChange={handleInputChange}
              className="block w-full border-gray-300 rounded-md p-2 mb-4 outline-none bg-slate-200"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={location}
              onChange={handleInputChange}
              className="block w-full border-gray-300 rounded-md p-2 mb-4 outline-none bg-slate-200"
            />
            <select
              className="block w-full border-gray-300 rounded-md p-2 mb-4 outline-none bg-slate-200"
              value={available}
              onChange={(e) => setAvailable(e.target.value)}
            >
              <option value="" hidden>
                Choose Whether Sold or Avaliable
              </option>
              <option value="Sold">Sold</option>
              <option value="Available">Available</option>
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full border-gray-300 rounded-md p-2 mb-4 outline-none bg-slate-200"
            />

            <button
              onClick={handleUpload}
              className="bg-blue-500 text-white px-4 py-2 rounded-md place-self-center font-bold "
            >
              {create}
            </button>
          </div>
        </div>
      )}

      {agentModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="bg-gray-900 bg-opacity-75 absolute inset-0"></div>
          <div className="relative bg-white rounded-lg p-8 w-[600px] h-[500px] flex flex-col gap-5 overflow-auto">
            <button
              onClick={() => setAgentModal(false)}
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 p-4"
            >
              &#x2715;
            </button>
            <h2 className="text-2xl font-bold mb-4 place-self-center">
              Agents
            </h2>
            <div className="flex flex-col gap-10 justify-center items-center">
              {agents?.map((agent) => (
                <div
                  key={agent._id} // assuming each agent has a unique id
                  className="bg-white rounded-lg shadow-xl p-4 flex flex-col gap-5 w-[400px]"
                >
                  <img
                    className="rounded-full h-48 place-self-center"
                    src="https://png.pngtree.com/png-vector/20231215/ourmid/pngtree-3d-character-cartoon-real-estate-agent-three-dimensional-realistic-occupation-png-image_11362983.png"
                  />
                  <h2 className="text-lg font-bold">Name: {agent.username}</h2>
                  <p className="text-gray-600 font-semibold text-lg">
                    Email: {agent.email}
                  </p>
                  <p className="text-gray-600 font-semibold text-lg">
                    Ratings: {agent.rating}{" "}
                  </p>
                  <div className="flex justify-center items-center gap-5">
                    <button
                      className="bg-violet-500 cursor-pointer p-4 rounded-xl hover:bg-violet-400 w-52 font-bold text-lg place-self-center"
                      onClick={() => sendToagent(agent._id)}
                    >
                      {`Send to ${agent.username}`}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SellerServicePage;
