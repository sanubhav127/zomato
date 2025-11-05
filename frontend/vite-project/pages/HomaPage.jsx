import { useEffect, useState, useRef } from "react";
import ReelCard from "../components/ReelCard";

export default function ReelsPage() {
  const [reels, setReels] = useState([]);
  const containerRef = useRef(null);


  useEffect(() => {
    async function fetchReels() {
      try {
        const res = await fetch("http://localhost:3000/api/reel/getReels", {
          credentials: "include",
        });
        const data = await res.json();
        setReels(data);
      } catch (err) {
        console.error("Failed to fetch reels", err);
      }
    }
    fetchReels();
  }, []);


  return (
    <div
      ref={containerRef}
      className="h-screen w-screen bg-gray-200 overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
    >
      {reels.map((reel) => (
        <div key={reel._id} className="h-screen flex justify-center items-center snap-start">
          <ReelCard reel={reel} />
        </div>
      ))}
    </div>
  );
}
