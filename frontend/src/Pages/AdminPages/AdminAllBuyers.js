import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminHeader from "../../Components/Adminheader";
import bgimage from "../../assets/bgimage.png";
import { ImSpinner8 } from "react-icons/im";

const AdminAllBuyers = () => {
  const [buyers, setBuyers] = useState([]);
  const [property, setProperty] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getAllBuyers = async () => {
    try {
      const { data } = await axios.get("/api/v1/buyer/get-Users");
      if (data?.success) {
        setBuyers(data?.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDel = async (id) => {
    try {
      const { data } = await axios.post("/api/v1/buyer/delete", { id: id });
      if (data?.success) {
        alert("Account suspended successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProperty = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/buyer/singleuser", {
        buyerID: id,
      });
      if (data?.success) {
        console.log(data?.buyer?.property);
        setProperty(data?.buyer?.property);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = (id) => {
    getProperty(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    getAllBuyers();
  }, []);

  // Filter buyers based on search query
  const filteredBuyers = buyers.filter((buyer) =>
    buyer.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <AdminHeader />
      <div
        className="h-screen"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="content p-4 flex flex-col">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={handleSearch}
            className="p-4 rounded-xl outline-none place-self-center bg-gray-300 mt-5 w-[400px]"
          />
          <div className="flex justify-evenly items-center mt-10 flex-wrap">
            {filteredBuyers.map((buyer) => {
              return (
                <div className="flex flex-col mt-20" key={buyer._id}>
                  <div className="p-4 rounded-xl flex flex-col flex-wrap bg-white shadow-xl max-h-[450px] overflow-auto w-[400px]">
                    <img
                      src="https://banner2.cleanpng.com/20231217/rlf/transparent-cartoon-real-estate-home-buying-sold-property-woma-woman-smiles-with-sold-sign-in-1710971320605.webp"
                      className="rounded-full h-48 place-self-center cursor-pointer hover:scale-105"
                      onClick={() => openModal(buyer._id)}
                    />
                    <h1 className="font-bold text-2xl mt-8">
                      Name: {buyer.username}
                    </h1>
                    <h1 className="font-bold text-2xl mt-5">
                      Email: {buyer.email}
                    </h1>
                    <h1 className="font-bold text-2xl mt-5">
                      DOB:{" "}
                      {buyer.dob
                        ? new Date(buyer.dob).toLocaleDateString()
                        : "NA"}
                    </h1>
                    <h1 className="font-bold text-2xl mt-5">
                      Contact: {buyer.contact ? buyer.contact : "NA"}
                    </h1>
                  </div>
                  <button
                    className="bg-red-400 p-4 rounded-xl font-bold hover:bg-red-300 cursor-pointer"
                    onClick={() => handleDel(buyer._id)}
                  >
                    Suspend
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-500 bg-opacity-50 overflow-auto">
            <div className="flex flex-col gap-10 items-center p-4 bg-white w-[800px] max-h-[80vh] overflow-auto rounded-lg mt-10">
              {loading ? (
                <ImSpinner8 className="animate-spin" size={50} />
              ) : property.length > 0 ? (
                property.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-lg flex flex-col gap-5"
                  >
                    <img
                      src={item.image}
                      alt="Property"
                      className="rounded-xl h-48 place-self-center"
                    />
                    <h1 className="font-bold text-xl">
                      Property Name: {item.propertyname}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Description: {item.desc}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Price: USD{item.price}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Location: {item.location}
                    </h1>
                  </div>
                ))
              ) : (
                <h1 className="place-self-center font-bold text-4xl">
                  No Saved Properties
                </h1>
              )}
            </div>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminAllBuyers;
