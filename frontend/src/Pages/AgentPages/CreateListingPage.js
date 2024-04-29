import React, { useState, useEffect } from "react";
import AgentHeader from "../../Components/AgentHeader";
import bgimage from "../../assets/bgimage.png";
import axios from "axios";
import { IoIosAddCircle } from "react-icons/io";
const CreateListingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [propertyName, setPropertyName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const agentID = localStorage.getItem("agentID");
  const [create, setCreate] = useState("Create");
  const [property, setProperty] = useState([]);
  const [updateModal, setupdateModal] = useState(false);
  const agentName = localStorage.getItem("agentname");
  const [propertyName1, setPropertyName1] = useState("");
  const [description1, setDescription1] = useState("");
  const [price1, setPrice1] = useState("");
  const [location1, setLocation1] = useState("");
  const [image1, setImage1] = useState(null);
  const [propertyID, setpropertyID] = useState("");
  const [updatetext, setUpdate] = useState("Update");
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
        const { data } = await axios.post("/api/v1/agent/createProp", {
          id: agentID,
          propertyname: propertyName,
          description: description,
          image: propertyImage,
          price: price,
          location: location,
          sellerName: agentName,
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

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.post("/api/v1/agent/delProp", {
        id: agentID,
        propID: id,
      });
      if (data?.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAgent = async () => {
    try {
      const { data } = await axios.post("/api/v1/agent/getSingleUser", {
        agentID: agentID,
      });
      if (data?.success) {
        setProperty(data?.agent?.ownprop);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (item) => {
    console.log(item.available);
    setDescription1(item.description);
    setImage1(item.image);
    setLocation1(item.location);
    setPrice1(item.price);
    setPropertyName1(item.propertyname);
    setpropertyID(item._id);
    setAvailable1(item.available);
    setupdateModal(true);
  };

  const update = async () => {
    setUpdate("Updating....");
    try {
      const { data } = await axios.post("/api/v1/agent/update", {
        agentID: agentID,
        propertyID: propertyID,
        description: description1,
        image: image1,
        location: location1,
        propertyName: propertyName1,
        price: price1,
        available: available1,
      });
      if (data?.success) {
        setUpdate("Update");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAgent();
  }, []);
  return (
    <>
      <AgentHeader />
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
            <div className="flex justify-evenly items-center flex-wrap gap-20 mt-10">
              {property.map((item) => {
                return (
                  <div className="bg-white shadow-xl p-4 w-[400px] flex flex-col gap-5 rounded-xl text-gray-500 max-h-[600px] overflow-auto">
                    <img className="rounded-xl h-52" src={item.image} />
                    <h1 className="font-bold text-xl">
                      Property Name: {item.propertyname}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Description: {item.description}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Price: USD{item.price}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Location: {item.location}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Availablilty: {item.available}
                    </h1>
                    <div className="buttons flex justify-between items-center font-bold text-black gap-5">
                      <button
                        className="bg-green-500 p-4 w-full rounded-xl hover:bg-green-400 cursor-pointer"
                        onClick={() => handleUpdate(item)}
                      >
                        Update
                      </button>

                      <button
                        className="bg-red-500 p-4 w-full rounded-xl hover:bg-red-400 cursor-pointer"
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
      {updateModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="bg-gray-900 bg-opacity-75 absolute inset-0"></div>
          <div className="relative bg-white rounded-lg p-8 w-[600px] flex flex-col gap-5">
            <button
              onClick={() => setupdateModal(false)}
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700 p-4"
            >
              &#x2715;
            </button>
            <h2 className="text-2xl font-bold mb-4 place-self-center ">
              Update Property
            </h2>
            <input
              type="text"
              name="propertyName"
              placeholder="Property Name"
              value={propertyName1}
              onChange={(e) => setPropertyName1(e.target.value)}
              className="block w-full border-gray-300 rounded-md p-2 mb-4 outline-none bg-slate-200"
            />
            <textarea
              cols={50}
              type="text"
              name="description"
              placeholder="Description"
              value={description1}
              onChange={(e) => setDescription1(e.target.value)}
              className="block w-full border-gray-300 rounded-md p-2 mb-4 outline-none bg-slate-200"
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={price1}
              onChange={(e) => setPrice1(e.target.value)}
              className="block w-full border-gray-300 rounded-md p-2 mb-4 outline-none bg-slate-200"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={location1}
              onChange={(e) => setLocation1(e.target.value)}
              className="block w-full border-gray-300 rounded-md p-2 mb-4 outline-none bg-slate-200"
            />
            <select
              className="block w-full border-gray-300 rounded-md p-2 mb-4 outline-none bg-slate-200"
              value={available1}
              onChange={(e) => setAvailable1(e.target.value)}
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
              onChange={(e) => setImage1(e.target.files[0])}
              className="block w-full border-gray-300 rounded-md p-2 mb-4 outline-none bg-slate-200"
            />

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md place-self-center font-bold "
              onClick={() => update()}
            >
              {updatetext}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateListingPage;
