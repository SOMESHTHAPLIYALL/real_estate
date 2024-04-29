import React, { useEffect, useState } from "react";
import AgentHeader from "../../Components/AgentHeader";
import axios from "axios";

const AgentProfilePage = () => {
  const agentID = localStorage.getItem("agentID");
  const [agent, setAgent] = useState(null);
  let index = 0;

  const getAgent = async () => {
    try {
      const { data } = await axios.post("/api/v1/agent/getSingleUser", {
        agentID: agentID,
      });
      if (data?.success) {
        setAgent(data?.agent);
        console.log(data?.agent.reviews);
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
      <div className="min-h-screen">
        <div className="content p-4">
          <div className="flex flex-col">
            <div className="box bg-blue-200 rounded-xl  w-full mt-5 flex flex-col p-4">
              <img
                className="rounded-full h-[200px] place-self-center"
                src="https://png.pngtree.com/png-vector/20231215/ourmid/pngtree-3d-character-cartoon-real-estate-agent-three-dimensional-realistic-occupation-png-image_11362983.png"
              />
              <h1 className="place-self-center font-bold text-4xl">
                {agent?.username}
              </h1>
              <div className="flex  justify-evenly items-center mt-20 ">
                <h1 className="font-bold text-2xl">
                  Username: {agent?.username}{" "}
                </h1>
                <h1 className="font-bold text-2xl">Email: {agent?.email} </h1>
                <h1 className="font-bold text-2xl">Ratings: {agent?.rating}</h1>
                <h1 className="font-bold text-2xl">
                  Total Properties: {agent?.properties.length}
                </h1>
                <h1 className="font-bold text-2xl">
                  Total Reviews: {agent?.rating?.length}
                </h1>
              </div>
              <div className="box flex justify-evenly items-center mt-10">
                {agent?.properties.length > 0 ? (
                  <div className="bg-white w-[700px] h-[500px] p-4 rounded-xl overflow-auto flex flex-col">
                    <h1 className="place-self-center text-4xl font-bold ">
                      Properties
                    </h1>
                    <div className="flex justify-center gap-20 flex-wrap items-center mt-4 p-4">
                      {agent?.properties.map((item) => {
                        return (
                          <div className="bg-white shadow-xl p-4 w-[400px] flex flex-col gap-5 rounded-xl text-gray-500">
                            <img
                              className="rounded-xl"
                              src={item.image}
                              alt="Property"
                            />
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
                              Price: USD{item.price}
                            </h1>
                            <h1 className="font-bold text-xl">
                              Location: {item.location}
                            </h1>
                            <h1 className="font-bold text-xl">
                              Listed: {item.show ? "Yes" : "No"}
                            </h1>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
                {agent?.reviews.length > 0 ? (
                  <div className="bg-white w-[700px] max-h-[500px] h-fit rounded-xl overflow-auto flex flex-col p-4">
                    <h1 className="font-bold text-4xl place-self-center">
                      Reviews
                    </h1>
                    <div className="flex flex-col mt-10 gap-10 font-bold text-lg">
                      {agent?.reviews?.map((item) => {
                        return (
                          <>
                            <h1 className="bg-gray-200 rounded-xl p-4">
                              {(index += 1)}. {item.review}
                            </h1>
                          </>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentProfilePage;
