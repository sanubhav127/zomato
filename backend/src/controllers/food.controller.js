import Food from "../models/food.model.js";
import cloudinary from "../utils/cloudinary.js";
import asyncHandler from "express-async-handler";

async function uploadBufferToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "video", folder: "food_reels" },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    );
    stream.end(buffer);
  });
}

export const addReels = asyncHandler(async(req, res) => {
  try {
    
    if (!req.file) {
    res.status(400);
    throw new Error("Video file is required.");
  }

  const { name, price, description, rating } = req.body;
  if (!name || !price || !description) {
    res.status(400);
    throw new Error("Name and price are required.");
  }

  const uploaded = await uploadBufferToCloudinary(req.file.buffer, req.file.originalname);

  const reel = await Food.create({
    name,
    video: { url: uploaded.url, public_id: uploaded.public_id },
    price,
    description,
    foodPartner : req.foodPartner,
    rating
  });

  await reel.save();

  res.status(201).json({
    success: true,
    message: "Reel uploaded successfully",
    reel
  });

  } catch (error) {
    res.status(500).json({ message: "Cloudinary upload failed", error });
    console.log(error);
  }
});   

export const getReels = asyncHandler(async (req, res) => {
  const reels = await Food.find()
    .populate("foodPartner", "_id fullname restaurantName profilePicture")
    .sort({ createdAt: -1 });

  res.json(reels); 
});

export const getReelsByPartner = asyncHandler(async (req, res) => {
  const { partnerId } = req.params;
  const reels = await Food.find({ foodPartner: partnerId })
    .populate("foodPartner", "_id fullname restaurantName profilePicture")
    .sort({ createdAt: -1 });
  res.json(reels);
});

export const likeReel = async (req, res) => {
  try {
    const userId = req.user._id;
    const reel = await Food.findById(req.params.id);

    if (!reel) return res.status(404).json({ message: "Reel not found" });

    // Remove user from dislikes if they had disliked
    reel.dislikes = reel.dislikes.filter(
      (id) => id.toString() !== userId.toString()
    );

    if (reel.likes.includes(userId)) {
      reel.likes = reel.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      reel.likes.push(userId);
    }

    await reel.save();
    res.json({ likes: reel.likes.length, dislikes: reel.dislikes.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const dislikeReel = async (req, res) => {
  try {
    const userId = req.user._id;
    const reel = await Food.findById(req.params.id);

    if (!reel) return res.status(404).json({ message: "Reel not found" });

    // Remove user from likes if they had liked
    reel.likes = reel.likes.filter(
      (id) => id.toString() !== userId.toString()
    );

    // Toggle dislike
    if (reel.dislikes.includes(userId)) {
      reel.dislikes = reel.dislikes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      reel.dislikes.push(userId);
    }

    await reel.save();
    res.json({ likes: reel.likes.length, dislikes: reel.dislikes.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user._id;

    const reel = await Food.findById(req.params.id);
    if (!reel) return res.status(404).json({ message: "Reel not found" });

    reel.comments.push({ user: userId, text });
    await reel.save();

    res.status(201).json({ comments: reel.comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const reel = await Food.findById(req.params.id).populate("comments.user", "fullname profilePicture");
    if (!reel) return res.status(404).json({ message: "Reel not found" });

    res.json({ comments: reel.comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};