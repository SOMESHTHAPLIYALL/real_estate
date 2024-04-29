import React, { useEffect, useState } from "react";
import BuyerHeader from "../../Components/BuyerHeader";
import axios from "axios";
import bgimage from "../../assets/bgimage.png";

const BuyerSavedProperties = () => {
  const buyerID = localStorage.getItem("buyerID");
  const [properties, setProperties] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");

  const getUser = async () => {
    try {
      const { data } = await axios.post("/api/v1/buyer/singleuser", {
        buyerID: buyerID,
      });
      if (data?.success) {
        console.log(data?.buyer?.property);
        setProperties(data?.buyer?.property);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProperty = async (propertyID) => {
    try {
      const { data } = await axios.post("/api/v1/buyer/deleteproperty", {
        propertyID: propertyID,
        buyerID: buyerID,
      });
      if (data?.success) {
        alert("Deleted succesfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const filteredProperties = properties.filter((property) =>
    property.location.toLowerCase().includes(searchLocation.toLowerCase())
  );

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <BuyerHeader />
      <div
        className="h-screen  "
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="content p-4">
          <div className="flex flex-col">
            <div className="mt-4 p-4 flex justify-center items-center">
              <input
                type="text"
                placeholder="Search by location..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="outline-none p-4 rounded-xl bg-gray-200 w-[400px]"
              />
            </div>
            <div className="flex justify-evenly items-center gap-10 mt-6 flex-wrap ">
              {filteredProperties?.map((property) => {
                return (
                  <div className="bg-white shadow-xl p-4 w-[400px] max-h-[600px] overflow-auto flex flex-col gap-5 rounded-xl text-gray-500  ">
                    <img className="rounded-xl" src={property.image} />
                    <h1 className="font-bold text-xl">
                      Property Name: {property.propertyname}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Description: {property.desc}
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
                    <button
                      className="w-full p-4 rounded-xl font-bold text-lg bg-red-500 hover:bg-red-400 cursor-pointer text-black"
                      onClick={() => deleteProperty(property._id)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyerSavedProperties;
