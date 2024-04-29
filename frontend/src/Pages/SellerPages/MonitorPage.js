import React, { useEffect, useState } from "react";
import SellerHeader from "../../Components/SellerHeader";
import axios from "axios";
import bgimage from "../../assets/bgimage.png";

const MonitorPage = () => {
  const sellerID = localStorage.getItem("sellerID");
  const [property, setProperty] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post("/api/v1/seller/singleSeller", {
          sellerID: sellerID,
        });
        console.log(data?.seller?.property);
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
        className="h-screen"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="content p-4">
          <div className="flex">
            <div className="properties  flex justify-evenly flex-wrap items-center  gap-20 mt-10">
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
                      Price: USD${item.price}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Location: {item.location}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Availablilty: {item.available}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Number Of Saves: {item.numberofsave}
                    </h1>
                    <h1 className="font-bold text-xl">
                      Number Of Views: {item.numberofview}
                    </h1>
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

export default MonitorPage;
