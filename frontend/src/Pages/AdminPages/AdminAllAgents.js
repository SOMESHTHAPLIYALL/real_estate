import React, { useState, useEffect } from "react";
import axios from "axios";
import Adminheader from "../../Components/Adminheader";
import { GoCodeReview } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import bgimage from "../../assets/bgimage.png";

const AdminAllAgents = () => {
  const [agents, setAgents] = useState([]);
  const [reviewModal, setReviewModal] = useState(false);
  const [review, setReview] = useState("");
  const [id, setID] = useState("");
  const [loading, setLoading] = useState(false);
  const [agentModal, setAgentmodal] = useState(false);
  let agentID = "";
  const [agent, setAgent] = useState(null);
  let rating = "3";
  let index = 0;
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/v1/agent/get-Users");
        setAgents(response.data.users);
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchData();
  }, []);

  const handlerating = async (agentID) => {
    try {
      const { data } = await axios.post("/api/v1/agent/updaterating", {
        agentID: agentID,
        rating: rating,
      });
      if (data?.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleContactAgent = (email) => {
    window.location.href = `mailto:${email}?subject=Regarding Property Inquiry`;
  };

  const postReview = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/agent/givereview", {
        id: id,
        review: review,
      });
      if (data?.success) {
        setLoading(false);
        setReview("");
        alert("Review created succesfully");
        setReviewModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleUser = async () => {
    try {
      const { data } = await axios.post("/api/v1/agent/getSingleUser", {
        agentID: agentID,
      });
      if (data?.success) {
        setAgent(data?.agent);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardClick = (id) => {
    agentID = id;
    getSingleUser();
    setAgentmodal(true);
  };

  const handleReview = (id) => {
    setReviewModal(true);
    setID(id);
  };

  const handleDel = async (id) => {
    try {
      const { data } = await axios.post("/api/v1/agent/delete", { id: id });
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

  const filteredAgents = agents.filter((agent) =>
    agent.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <Adminheader />
      <div
        className="h-screen "
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex justify-center items-center p-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={handleSearch}
            className="p-4 rounded-xl outline-none bg-gray-300 mt-5 w-[400px]"
          />
        </div>

        <div className="container p-8 flex  mt-10 flex-wrap justify-evenly  gap-20 ">
          {filteredAgents?.map((agent) => (
            <div
              key={agent._id} // assuming each agent has a unique id
              className="bg-white rounded-lg shadow-xl p-4 flex flex-col gap-5 w-[400px] hover:cursor-pointer hover:scale-105"
            >
              <img
                className="rounded-full h-48 place-self-center"
                src="https://png.pngtree.com/png-vector/20231215/ourmid/pngtree-3d-character-cartoon-real-estate-agent-three-dimensional-realistic-occupation-png-image_11362983.png"
                onClick={() => {
                  handleCardClick(agent._id);
                }}
              />
              <h2 className="text-lg font-bold">Name: {agent.username}</h2>
              <p className="text-gray-600 font-semibold text-lg">
                Email: {agent.email}
              </p>
              <p className="text-gray-600 font-semibold text-lg">
                Ratings: {agent.rating}{" "}
              </p>
              <p className="text-gray-600 font-semibold text-lg">
                DOB:{" "}
                {agent.dob ? new Date(agent.dob).toLocaleDateString() : "NA"}
              </p>
              <p className="text-gray-600 font-semibold text-lg">
                Contact: {agent.contact ? agent.contact : "NA"}
              </p>
              <div className="flex justify-center items-center gap-5">
                <button
                  className="bg-violet-500 cursor-pointer p-4 rounded-xl hover:bg-violet-400 w-52 font-bold text-lg place-self-center"
                  onClick={() => handleContactAgent(agent.email)}
                >
                  Contact
                </button>

                <select
                  className="bg-yellow-300 cursor-pointer p-4 rounded-xl hover:bg-yellow-200 w-52 font-bold text-lg place-self-center"
                  onChange={async (e) => {
                    try {
                      rating = e.target.value;
                      handlerating(agent._id);
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <option value="" hidden>
                    Rating
                  </option>
                  <option className="bg-white" value="&#9733;">
                    &#9733;
                  </option>
                  <option className="bg-white" value="&#9733; &#9733;">
                    &#9733; &#9733;
                  </option>
                  <option className="bg-white" value="&#9733; &#9733; &#9733;">
                    &#9733; &#9733; &#9733;
                  </option>
                  <option
                    className="bg-white"
                    value="&#9733; &#9733; &#9733; &#9733;"
                  >
                    &#9733; &#9733; &#9733; &#9733;
                  </option>
                  <option
                    className="bg-white"
                    value="&#9733; &#9733; &#9733; &#9733; &#9733;"
                  >
                    &#9733; &#9733; &#9733; &#9733; &#9733;
                  </option>
                </select>
              </div>
              <button
                className="bg-green-400 p-4 rounded-xl font-bold hover:bg-green-300 cursor-pointer"
                onClick={() => {
                  handleReview(agent._id);
                }}
              >
                Review
              </button>
              <button
                className="bg-red-400 p-4 rounded-xl font-bold hover:bg-red-300 cursor-pointer"
                onClick={() => handleDel(agent._id)}
              >
                Suspend
              </button>
            </div>
          ))}
        </div>
      </div>

      {reviewModal && (
        <div className="fixed z-10 inset-0 flex justify-center overflow-y-auto items-center backdrop-blur-md ">
          <div className="bg-slate-200 p-4 rounded-xl h-[500px] w-[500px] flex flex-col gap-10">
            <h1 className="place-self-center font-bold text-2xl">Review</h1>

            <textarea
              className="h-44 p-2 rounded-xl outline-none"
              placeholder="Write your review here!"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <div className="flex flex-col justify-center items-center gap-5">
              <button
                className="place-self-center bg-violet-400 hover:bg-violet-300 cursor-pointer p-4 rounded-xl font-bold w-full flex justify-center items-center gap-2 text-xl"
                onClick={() => postReview()}
              >
                {loading ? (
                  <AiOutlineLoading3Quarters
                    className="animate-spin"
                    size={30}
                  />
                ) : (
                  <span className="flex justify-center items-center gap-2">
                    <GoCodeReview size={30} />
                    Post
                  </span>
                )}
              </button>
              <button
                className="place-self-center bg-red-400 hover:bg-red-300 cursor-pointer p-4 rounded-xl font-bold w-full flex justify-center items-center gap-2 text-xl"
                onClick={() => {
                  setReviewModal(false);
                  setReview("");
                }}
              >
                <IoMdClose size={30} />
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {agentModal && (
        <div className="fixed z-10 inset-0 flex justify-center overflow-auto items-center backdrop-blur-md ">
          <div className="bg-slate-100 p-4 rounded-xl h-[500px] w-[500px] flex flex-col overflow-auto ">
            <button
              className="place-self-end text-2xl"
              onClick={() => {
                setAgentmodal(false);
              }}
            >
              X
            </button>
            <div className="flex w-full flex-col  ">
              <img
                className="rounded-full h-48 place-self-center"
                src="https://png.pngtree.com/png-vector/20231215/ourmid/pngtree-3d-character-cartoon-real-estate-agent-three-dimensional-realistic-occupation-png-image_11362983.png"
              />
              <h1 className=" place-self-center text-2xl font-bold">
                {agent?.username}
              </h1>
              <h1 className="p-2 font-bold text-xl mt-5">
                Email: {agent?.email}
              </h1>
              <h1 className="p-2 font-bold text-xl mt-5">
                Ratings: {agent?.rating}
              </h1>
              <h1 className="p-2 font-bold text-xl mt-5">
                Properties Listed: {agent?.properties.length}
              </h1>
              <h1 className="mt-5 p-2 font-bold text-xl">Reviews:</h1>

              <div className="flex flex-col overflow-auto gap-5 ">
                {agent?.reviews?.map((review) => {
                  return (
                    <div className="flex flex-col ml-4 font-semibold">
                      <h1>
                        {(index += 1)}. {review.review}
                      </h1>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAllAgents;
