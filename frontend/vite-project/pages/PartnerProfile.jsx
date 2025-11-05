import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ArrowLeft, Loader2 } from "lucide-react";
import axios from "axios";


const PartnerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [partnerData, setPartnerData] = useState(null);
  const [activeTab, setActiveTab] = useState("menu");

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/foodPartner/${id}`, { credentials: "include" });
        const data = await response.data;
        setPartnerData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching partner data:", error);
      }
    };

    fetchPartnerData();
  }, [id]);

  if (!partnerData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin h-28 w-28 " />
      </div>
    );
  }

  const { foodPartner, menu } = partnerData;


  return (
      <div className="min-h-screen bg-gray-50 text-black">
        
      <div className="flex items-center p-4 border-b border-gray-700">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ArrowLeft className="text-black" size={24} />
        </button>
        <h2 className="text-xl font-semibold">Restaurant Details</h2>
      </div>

        <div className="p-4 flex items-center gap-4">
        {/* Profile Pic */}
        <img
          src={foodPartner.profilePicture || "https://via.placeholder.com/80"}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-700"
        />

         <div className="flex flex-col flex-1">
          <h1 className="text-2xl font-bold">{foodPartner.restaurantName}</h1>
          <p className="text-black text-sm">{foodPartner.address || "No address provided"}</p>
          <p className="text-black text-sm">{foodPartner.fullname}</p>
          
          <div className="flex items-center gap-1 mt-1">
            <Star className="text-yellow-400" size={16} />
            <span>{foodPartner.rating || "New"}</span>
          </div>
        </div>
      </div>

       <div className="flex border-y border-gray-700">
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === "menu" ? "bg-red-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("menu")}
        >
          Menu
        </button>
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === "reels" ? "bg-red-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("reels")}
        >
          Reels
        </button>
      </div>

      <div className="p-4">
        {activeTab === "menu" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {menu.length === 0 ? (
              <p className="text-gray-400 text-center w-full">No menu items available.</p>
            ) : (
              menu.map((item) => (
                <div key={item._id} className="bg-red-500 p-4 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                  <p className="text-white">{item.description}</p>
                  <p className="text-green-400 font-bold mt-2">₹{item.price}</p>
                </div>
              ))
            )}
          </div>
        ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {menu.filter((item) => item.video).length === 0 ? (
                <p className="text-gray-400 text-center col-span-full">
                  No reels uploaded.
                </p>
              ) : (
                menu
                  .filter((item) => item.video)
                  .map((item) => (
                    <video
                      key={item._id}
                      src={item.video.url}
                      className="w-full h-64 object-cover rounded-lg"
                      autoPlay
                      loop
                      muted={false}
                      playsInline
                    />
                  ))
              )}
            </div>
        )}
      </div>
    </div>
  );
}

export default PartnerProfile;
