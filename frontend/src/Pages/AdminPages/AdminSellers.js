import React, { useEffect, useState } from "react";
import AdminHeader from "../../Components/Adminheader";
import axios from "axios";
import { ImSpinner8 } from "react-icons/im";
import bgimage from "../../assets/bgimage.png";

const AdminSellers = () => {
  const [allusers, setAllusers] = useState([]);
  const [property, setProperty] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getSellers = async () => {
    try {
      const { data } = await axios.get("/api/v1/seller/get-Users");
      if (data?.success) {
        setAllusers(data?.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProperty = async (id) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/seller/singleSeller", {
        sellerID: id,
      });
      if (data?.success) {
        setProperty(data?.seller?.property);
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
  const handleDel = async (id) => {
    try {
      const { data } = await axios.post("/api/v1/seller/delete", { id: id });
      if (data?.success) {
        alert("Account suspended succesfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredSellers = allusers.filter((seller) =>
    seller.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(() => {
    getSellers();
  }, []);

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
        <div className="p-4 content">
          <div className="flex justify-center items-center p-4">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={handleSearch}
              className="p-4 rounded-xl outline-none bg-gray-300 mt-5 w-[400px]"
            />
          </div>
          <div className="flex justify-evenly gap-10 mt-10 items-center flex-wrap">
            {filteredSellers?.map((user, index) => (
              <div className="flex flex-col">
                <div
                  key={index}
                  className="bg-white flex-col rounded-lg flex shadow-xl p-4 gap-5 hover:cursor-pointer mt-5"
                  onClick={() => openModal(user._id)}
                >
                  <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/property-dealer-5329593-4470621.png"
                    alt="User"
                    className="rounded-full h-48 place-self-center"
                  />
                  <h1 className="font-bold text-2xl mt-8">
                    Name: {user.username}
                  </h1>
                  <h1 className="font-bold text-2xl mt-5">
                    Email: {user.email}
                  </h1>
                  <h1 className="font-bold text-2xl mt-5">
                    DOB:{" "}
                    {user.dob ? new Date(user.dob).toLocaleDateString() : "NA"}
                  </h1>
                  <h1 className="font-bold text-2xl mt-5">
                    Contact: {user.contact ? user.contact : "NA"}
                  </h1>
                </div>
                <button
                  className="bg-red-400 p-4 rounded-xl font-bold hover:bg-red-300 cursor-pointer"
                  onClick={() => handleDel(user._id)}
                >
                  Suspend
                </button>
              </div>
            ))}
          </div>
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
                  <h1 className="font-bold text-xl">Price: USD{item.price}</h1>
                  <h1 className="font-bold text-xl">
                    Location: {item.location}
                  </h1>
                </div>
              ))
            ) : (
              <h1 className="place-self-center font-bold text-4xl">
                No Properties
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
    </>
  );
};

export default AdminSellers;
