import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ArrowLeft, Loader2, Edit, PlusCircle, Upload, Video, Tag, FileText } from "lucide-react";
import axios from "axios";

const PartnerHome = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [partnerData, setPartnerData] = useState("");
  const [activeTab, setActiveTab] = useState("menu");
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");

  // Fetch partner details
  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/foodPartner/${id}`, { credentials: "include" });
        const data = await response.data;
        setPartnerData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching partner data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerData();
  }, [id]);

    const { foodPartner, menu } = partnerData;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin h-28 w-28 text-gray-400" />
      </div>
    );
  }

  if (!partnerData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-400 text-lg">Partner not found.</p>
      </div>
    );
  }

  // Handle Profile Picture Upload
  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      await axios.put(
        `http://localhost:3000/api/foodPartner/${id}/updateProfilePicture`,
        formData,
        { withCredentials: true }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  // Handle Reel Upload
  const handleReelUpload = async (e) => {
    e.preventDefault();
  if (!video || !name || !price || !description) {
    alert("Please fill all required fields!");
    return;
  }

  const formData = new FormData();
  formData.append("video", video);
  formData.append("name", name);
  formData.append("price", price);
  formData.append("description", description);
  if (rating) formData.append("rating", rating);

  try {
    console.log("Uploading reel...", formData.get("video")); 

    await axios.post("http://localhost:3000/api/reel/addReels", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const fetchPartnerData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/foodPartner/${id}`, { credentials: "include" });
        const data = await response.data;
        setPartnerData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching partner data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerData();


    setVideo(null);
    setPreview(null);
    setName("");
    setPrice("");
    setDescription("");
    setRating("");

    alert("Reel uploaded successfully!");
  } catch (error) {
    console.error("Error uploading reel:", error.response?.data || error.message);
    alert("Upload failed");
  }
};

  const logout = async () => {
  try {
    await axios.post("http://localhost:3000/api/foodPartner/logout", {}, { withCredentials: true });
    window.location.href = "/foodPartnerLogin";  
  } catch (err) {
    console.error("Logout failed", err);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-700">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ArrowLeft className="text-black" size={24} />
        </button>
        <h2 className="text-xl font-semibold">Restaurant Dashboard</h2>
        <button onClick={logout} className="ml-auto bg-red-600 px-3 py-2 rounded-lg hover:bg-red-700 transition text-white">
          Logout
        </button>
      </div>

      {/* Profile Section */}
      <div className="p-4 flex items-center gap-4">
        <div className="relative">
          <img
            src={foodPartner.profilePicture || "https://via.placeholder.com/80"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-700"
          />
          <label className="absolute bottom-0 right-0 bg-gray-200 p-1 rounded-full cursor-pointer">
            <Edit size={16} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </label>
        </div>

        <div className="flex flex-col flex-1">
          <h1 className="text-2xl font-bold">{foodPartner.restaurantName}</h1>
          <p className="text-black text-sm">
            {foodPartner.address || "No address provided"}
          </p>
          <p className="text-black text-sm">{foodPartner.fullname}</p>

          <div className="flex items-center gap-1 mt-1">
            <Star className="text-yellow-400" size={16} />
            <span>{foodPartner.rating || "New"}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
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
        <button
          className={`flex-1 py-2 text-center ${
            activeTab === "upload" ? "bg-red-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab("upload")}
        >
          Upload
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* MENU SECTION */}
        {activeTab === "menu" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {menu.length === 0 ? (
              <p className="text-gray-400 text-center w-full">
                No menu items available.
              </p>
            ) : (
              menu.map((item) => (
                <div
                  key={item._id}
                  className="bg-red-500 p-4 rounded-xl shadow-md"
                >
                  <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                  <p className="text-gray-50">{item.description}</p>
                  <p className="text-green-400 font-bold mt-2">₹{item.price}</p>
                </div>
              ))
            )}
           {/* <button
              onClick={() => alert("Want to add dishes?")}
              className="bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <PlusCircle size={18} /> Add Dish
            </button> */}
          </div>
        )}

        {/* REELS SECTION */}
        {activeTab === "reels" && (
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

        {/* UPLOAD SECTION */}
  {activeTab === "upload" && (
  <form
    onSubmit={handleReelUpload}
    className="bg-gray-900 p-6 rounded-2xl shadow-xl max-w-md mx-auto mt-6"
  >
    <h3 className="text-2xl font-bold mb-5 text-center text-white">
      Upload New Reel
    </h3>

    {/* Drag and Drop Upload */}
    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-xl p-6 mb-5 cursor-pointer hover:border-green-500 hover:bg-gray-800 transition">
      <Upload className="w-10 h-10 text-gray-400 mb-2" />
      <span className="text-gray-400">Click or drag video here</span>
      <input
        type="file"
        accept="video/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files[0];
          setVideo(file);
          setPreview(URL.createObjectURL(file)); // ✅ Preview
        }}
      />
    </label>

    {/* Video Preview */}
    {preview && (
      <div className="mb-4">
        <video
          src={preview}
          controls
          className="w-full rounded-lg border border-gray-700"
        />
      </div>
    )}

    {/* Inputs */}
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Video className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Dish Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="relative">
        <Tag className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="relative">
        <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="relative">
        <Star className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="number"
          placeholder="Rating (optional)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 w-full py-2 rounded-lg hover:bg-green-700 active:scale-[0.98] transition transform font-semibold"
      >
        Upload Reel
      </button>
    </div>
  </form>
)}
      </div>
    </div>
  );
};

export default PartnerHome;
