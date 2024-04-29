import React, { useEffect, useState } from "react";
import BuyerHeader from "../../Components/BuyerHeader";
import axios from "axios";
import bgimage from "../../assets/bgimage.png";

const BuyerAllPropertiesPage = () => {
  const buyerID = localStorage.getItem("buyerID");
  const [agents, setAgents] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedProps, setSelectedprop] = useState([]);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState(0);
  const [save, setSave] = useState(0);
  const getProperties = async () => {
    try {
      const { data } = await axios.get("/api/v1/agent/get-Users");
      if (data.success) {
        setAgents(data?.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveProperties = async (
    image,
    propertyname,
    description,
    price,
    location,
    sellername,
    available
  ) => {
    try {
      const { data } = await axios.post("/api/v1/buyer/saveproperty", {
        buyerID: buyerID,
        image: image,
        propertyname: propertyname,
        desc: description,
        price: price,
        location: location,
        sellername: sellername,
        available: available,
      });
      if (data?.success) {
        alert("Saved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveProperties2 = async (
    image,
    propertyname,
    description,
    price,
    location,
    sellername,
    available
  ) => {
    try {
      const { data } = await axios.post("/api/v1/buyer/saveproperty", {
        buyerID: buyerID,
        image: image,
        propertyname: propertyname,
        desc: description,
        price: price,
        location: location,
        sellername: sellername,
        available: available,
      });
      if (data?.success) {
        alert("Saved");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const numberOfSave = async (propertyID, save, sellerID) => {
    try {
      const { data } = await axios.post("/api/v1/seller/save", {
        sellerID: sellerID,
        propertyID: propertyID,
        save: save,
      });

      if (data?.success) {
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const numberOfView = async (propertyID, view, sellerID) => {
    console.log(view);
    try {
      const { data } = await axios.post("/api/v1/seller/view", {
        sellerID: sellerID,
        propertyID: propertyID,
        view: view,
      });

      if (data?.success) {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProperty = async (propertyID, sellerID) => {
    console.log(propertyID, sellerID);
    const { data } = await axios.post("/api/v1/seller/singleprop", {
      propertyID: propertyID,
      sellerID: sellerID,
    });
    if (data?.success) {
      setView((prevView) => prevView + 1);
      setSave(data?.property?.numberofsave);
    }
  };
  const filteredProperties = agents.reduce((filtered, agent) => {
    return filtered.concat(
      agent.properties.filter((property) =>
        property.location.toLowerCase().includes(searchLocation.toLowerCase())
      )
    );
  }, []);
  const filteredProperties2 = agents.reduce((filtered, agent) => {
    return filtered.concat(
      agent.ownprop.filter((property) =>
        property.location.toLowerCase().includes(searchLocation.toLowerCase())
      )
    );
  }, []);
  useEffect(() => {
    getProperties();
  }, []);
  return (
    <>
      <BuyerHeader />
      <div
        className="h-screen "
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="content p-4">
          <div className="p-4 flex flex-col">
            <div className="mt-4 p-4 flex justify-center items-center">
              <input
                type="text"
                placeholder="Search by location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="outline-none p-4 rounded-xl bg-gray-200 w-[400px]"
              />
            </div>
            <div className="flex justify-evenly items-center  mt-10 flex-wrap ">
              {filteredProperties.map((property) =>
                property.show ? (
                  <div
                    key={property.propertyID}
                    className="bg-white shadow-xl p-4 w-[400px]  overflow-auto flex flex-col  gap-5 rounded-xl text-gray-500 mt-10 cursor-pointer hover:scale-105"
                    onClick={() => {
                      setSelectedprop([property]);
                      setShowModal(true);
                      getProperty(property.propertyID, property.sellerID);
                      numberOfView(
                        property.propertyID,
                        view + 1,
                        property.sellerID
                      );
                    }}
                  >
                    <img
                      className="rounded-xl h-52 place-self-center"
                      src={property.image}
                    />
                    <h1 className="font-bold text-xl">
                      Name: {property.propertyname}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Location: {property.location}
                    </h1>
                  </div>
                ) : null
              )}
              {filteredProperties2?.map((property) => (
                <div
                  key={property._id}
                  className="bg-white shadow-xl p-4 w-[400px]  flex flex-col justify-evenly gap-5 rounded-xl text-gray-500 max-h-[600px] overflow-auto mt-10 cursor-pointer hover:scale-105"
                  onClick={() => {
                    setSelectedprop([property]);
                    setShowModal2(true);
                  }}
                >
                  <img className="rounded-xl h-52" src={property.image} />
                  <h1 className="font-bold text-xl">
                    Name: {property.propertyname}
                  </h1>
                  <h1 className="font-bold text-xl">
                    Location: {property.location}
                  </h1>
                </div>
              ))}
            </div>
          </div>
          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-500 bg-opacity-50 overflow-auto">
              <div className="bg-white w-[800px] max-h-[80vh] flex flex-col gap-10 items-center p-4 overflow-auto rounded-lg mt-10">
                <div
                  className="place-self-end cursor-pointer text-3xl"
                  onClick={() => setShowModal(false)}
                >
                  X
                </div>
                {selectedProps?.map((property) => (
                  <div className="flex flex-col gap-10">
                    <img
                      className="rounded-xl h-52 place-self-center"
                      src={property.image}
                    />
                    <h1 className="font-bold text-xl">
                      Name: {property.propertyname}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Description: {property.description}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Price: USD{property.price}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Location: {property.location}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Seller Name: {property.sellername}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Availability: {property.available}
                    </h1>
                    <button
                      className="place-self-center p-4 w-[300px] rounded-xl font-bold text-xl bg-green-500 hover:bg-green-400 cursor-pointer text-black "
                      onClick={() => {
                        saveProperties(
                          property.image,
                          property.propertyname,
                          property.description,
                          property.price,
                          property.location,
                          property.sellername,
                          property.available
                        );
                        numberOfSave(
                          property.propertyID,
                          save + 1,
                          property.sellerID
                        );
                      }}
                    >
                      Save
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {showModal2 && (
            <div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gray-500 bg-opacity-50 overflow-auto">
              <div className="bg-white w-[800px] max-h-[80vh] flex flex-col gap-10 items-center p-4 overflow-auto rounded-lg mt-10">
                <div
                  className="place-self-end cursor-pointer text-3xl"
                  onClick={() => setShowModal2(false)}
                >
                  X
                </div>
                {selectedProps?.map((property) => (
                  <div className="flex flex-col gap-10">
                    <img
                      className="rounded-xl h-[250px] place-self-center w-[300px]"
                      src={property.image}
                    />
                    <h1 className="font-bold text-xl">
                      Name: {property.propertyname}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Description: {property.description}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Price: USD{property.price}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Location: {property.location}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Seller Name: {property.sellerName}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Availability: {property.available}
                    </h1>
                    <button
                      className="place-self-center p-4 w-[300px] rounded-xl font-bold text-xl bg-green-500 hover:bg-green-400 cursor-pointer text-black"
                      onClick={() => {
                        saveProperties2(
                          property.image,
                          property.propertyname,
                          property.description,
                          property.price,
                          property.location,
                          property.sellerName,
                          property.available
                        );
                      }}
                    >
                      Save
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BuyerAllPropertiesPage;
