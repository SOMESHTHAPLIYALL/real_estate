import React, { useEffect, useState } from "react";
import AgentHeader from "../../Components/AgentHeader";
import axios from "axios";
import bgimage from "../../assets/bgimage.png";
const AgentServicePage = () => {
  const agentID = localStorage.getItem("agentID");
  const [properties, setProperties] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [updatetext, setUpdate] = useState("Update");
  const [propertyName, setPropertyName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [id, setID] = useState("");
  const [updateModal, setupdateModal] = useState(false);
  const [sellerName, setSellerName] = useState("");
  const [sellerID, setsellerID] = useState("");
  const [propID, setpropID] = useState("");
  const [available, setAvailable] = useState("");

  const getProperties = async () => {
    try {
      const { data } = await axios.post("/api/v1/agent/getSingleUser", {
        agentID: agentID,
      });
      if (data?.success) {
        setProperties(data?.agent?.properties);
        console.log(data?.agent?.properties);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleListing = async (id, list) => {
    try {
      const { data } = await axios.post("/api/v1/agent/createList", {
        propertyID: id,
        agentID: agentID,
        list: list,
      });
      if (data?.success) {
        if (list === true) {
          alert("Listed succesfully");
        } else {
          alert("Unlisted succesfull");
        }
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const filteredProperties = properties.filter((item) =>
    item.location.toLowerCase().includes(searchLocation.toLowerCase())
  );
  const handleUpdate = async (item) => {
    setDescription(item.description);
    setImage(item.image);
    setLocation(item.location);
    setPrice(item.price);
    setPropertyName(item.propertyname);
    setID(item._id);
    setSellerName(item.sellername);
    setsellerID(item.sellerID);
    setpropID(item.propertyID);
    setAvailable(item.available);
    setupdateModal(true);
  };

  const update = async () => {
    setUpdate("Updating....");
    try {
      const { data } = await axios.post("/api/v1/agent/updateseller", {
        agentID: agentID,
        id: id,
        description: description,
        image: image,
        location: location,
        propertyName: propertyName,
        price: price,
        sellername: sellerName,
        sellerID: sellerID,
        propertyID: propID,
        available: available,
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
    getProperties();
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
        <div className="p-4 h-full content ">
          <div className="flex flex-col ">
            <div className="mt-4 p-4 flex justify-center items-center">
              <input
                type="text"
                placeholder="Search by location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="outline-none p-4 rounded-xl bg-gray-200 w-[400px]"
              />
            </div>
            <div className="flex justify-start gap-20 flex-wrap items-center mt-2 p-4 ">
              {filteredProperties.map((item) => {
                return (
                  <div className="bg-white shadow-xl p-4 w-[400px] flex flex-col gap-5 rounded-xl text-gray-500">
                    <img className="rounded-xl" src={item.image} />
                    <h1 className="font-bold text-xl">
                      Seller Name: {item.sellername}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Property Name: {item.propertyname}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Description: {item.description}
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
                    <h1 className="font-bold text-xl">
                      Listed: {item.show ? "Yes" : "No"}
                    </h1>
                    <div className="buttons flex justify-center items-center font-bold text-black gap-5">
                      <button
                        className="bg-green-500 p-4 w-52 rounded-xl hover:bg-green-400 cursor-pointer"
                        onClick={() => {
                          handleListing(item._id, true);
                        }}
                      >
                        List
                      </button>
                      <button
                        className="bg-red-500 p-4 w-52 rounded-xl hover:bg-red-400 cursor-pointer"
                        onClick={() => {
                          handleListing(item._id, false);
                        }}
                      >
                        Un-List
                      </button>
                    </div>
                    <button
                      className="bg-violet-500 p-4 rounded-xl hover:bg-violet-400 text-black font-bold  place-self-center w-full cursor-pointer"
                      onClick={() => handleUpdate(item)}
                    >
                      Update
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
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
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                  className="block w-full border-gray-300 rounded-md p-2 mb-4 outline-none bg-slate-200"
                />
                <textarea
                  cols={50}
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full border-gray-300 rounded-md p-2 mb-4 outline-none bg-slate-200"
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="block w-full border-gray-300 rounded-md p-2 mb-4 outline-none bg-slate-200"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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
                  onChange={(e) => setImage(e.target.files[0])}
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
        </div>
      </div>
    </>
  );
};

export default AgentServicePage;
