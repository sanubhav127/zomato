import { Play, MessageCircle, Share2, ThumbsUp, ThumbsDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";

export default function ReelCard({ reel }) {
  const [likes, setLikes] = useState(reel.likes.length);
  const [dislikes, setDislikes] = useState(reel.dislikes.length);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(reel.comments || []);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
  const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            try {
              video.currentTime = 0;
              video.muted = true;
              await video.play();
            } catch (err) {
              console.warn("Autoplay blocked:", err);
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.75 } // play only when 75% of video is visible
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
      video.pause();
    };
  }, [reel]);

  const handleLike = async () => {
    const { data } = await axios.post(`http://localhost:3000/api/reel/${reel._id}/like`, {}, { withCredentials: true });
    setLikes(data.likes);
    setDislikes(data.dislikes);
  };

  const handleDislike = async () => {
    const { data } = await axios.post(`http://localhost:3000/api/reel/${reel._id}/dislike`, {}, { withCredentials: true });
    setLikes(data.likes);
    setDislikes(data.dislikes);
  };

  const openComments = async () => {
    setIsCommentModalOpen(true);
    const { data } = await axios.get(`http://localhost:3000/api/reel/${reel._id}/comment`, { withCredentials: true });
    setComments(data.comments);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      `http://localhost:3000/api/reel/${reel._id}/comment`,
      { text: commentText },
      { withCredentials: true }
    );
    setComments(data.comments);
    setCommentText("");
  };
  
   /* const playVideo = async () => {
      if (!videoRef.current) return;
        try {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = true; 
        await videoRef.current.play();
      } catch (err) {
        console.warn("Autoplay blocked, trying muted play", err);
        videoRef.current.muted = true;
        await videoRef.current.play();
      }
      }

    playVideo();

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, [reel]); */



  return (
    <>
    <div className="relative w-[400px] h-[700px] rounded-2xl overflow-hidden shadow-2xl">
      {/* Video */}
      <video
        ref={videoRef}
        src={reel.video.url}
        className="w-full h-full object-cover"
        playsInline
        autoPlay
        loop
      />

      {/* Bottom Left - Restaurant Info */}
      <div className="absolute bottom-6 left-4 text-white">
        <p className="font-bold">@{reel.foodPartner?.restaurantName || "Restaurant"}</p>
        <p className="text-sm">{reel.description}</p>
        <button
          onClick={() => (window.location.href = `/partner/${reel.foodPartner?._id}`)}
          className="mt-2 bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600"
        >
          Visit Restaurant
        </button>
      </div>

      {/* Right Side - Icons */}
      <div className="absolute right-4 top-1/2 flex flex-col gap-4 text-white">
        <button  onClick={handleLike} className="flex flex-col items-center">
          <ThumbsUp className="h-6 w-6" />
          <span className="text-sm">{likes}</span>
        </button>
          <button onClick={handleDislike} className="flex flex-col items-center">
          <ThumbsDown className="h-6 w-6" />
          <span className="text-sm">{dislikes}</span>
        </button>
        <button  onClick={openComments} className="flex flex-col items-center">
          <MessageCircle className="h-6 w-6" />
          <span className="text-sm">{comments.length}</span>
        </button>
      </div>
    </div>

  {/* Comment Modal */}
  {isCommentModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-4 relative">
      
      {/* Close Button */}
      <button
        onClick={() => setIsCommentModalOpen(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-black"
      >
        <X />
      </button>

      <h2 className="text-lg font-semibold mb-3">Comments</h2>

      {/* Comments List */}
      <div className="max-h-64 overflow-y-auto space-y-2 mb-3">
        {comments && comments.length > 0 ? (
          comments.map((c, i) => (
            <div key={i} className="border-b pb-2">
              <p className="text-sm text-gray-700">
                <strong>{c.user?.fullname || "User"}:</strong> {c.text}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        )}
      </div>

      {/* Add Comment */}
      <form onSubmit={handleComment} className="flex gap-2">
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-lg text-sm hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  </div>
)}
</>
  );
}