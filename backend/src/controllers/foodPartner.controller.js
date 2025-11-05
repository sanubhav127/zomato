import FoodPartner from "../models/foodPartner.model.js";
import Food from "../models/food.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";

async function uploadBufferToCloudinary(buffer, filename) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "partner_photos" },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    );
    stream.end(buffer);
  });
}

export const signup = async (req , res) =>{

    const {fullname, email, password, restaurantName, address } = req.body;

    try {
       if(!fullname || !password || !email || !restaurantName || !address){
        return res.status(400).json({message : "All fields are mandatory!"})
       }; 

       const foodPartner = await FoodPartner.findOne({email});
       if(foodPartner){
        return res.status(409).json({message : "Person already exists"});
       };

       const genSalt = await bcrypt.genSalt(10);
       const hashPassword = await bcrypt.hash(password, genSalt);

       const newfoodPartner = new FoodPartner({
        fullname,
        email,
        password : hashPassword,
        restaurantName,
        address
       });

       await newfoodPartner.save();

       const token = jwt.sign({_id : newfoodPartner._id, email : newfoodPartner.email}, process.env.JWT_SECRET, {expiresIn : "7d"});

       res.cookie("token" , token, {
        httpOnly: true,
        secure: false, // set true in production with HTTPS
        sameSite: "strict",
        maxAge : 7*24*60*60*1000
       });

       res.status(201).json({message : "User registered successfully!",
        foodPartner : newfoodPartner
       });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {

    const {email, password} = req.body;
    try {
        const foodPartner = await FoodPartner.findOne({email}).select("+password")
        if(!foodPartner){
            return res.status(401).json({message : "Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password, foodPartner.password);
        if(!isMatch){
            return res.status(401).json({message : "Invalid email or password"});
        }

        const token = jwt.sign({_id : foodPartner._id, email : foodPartner.email}, process.env.JWT_SECRET, {expiresIn : "7d"});

        res.cookie("token" , token, {
        httpOnly: true,
        secure: false, // set true in production with HTTPS
        sameSite: "strict",
        maxAge : 7*24*60*60*1000
       });

       res.json({ message: "Login successful!",
        foodPartner
        });
    } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Server error" });   
    }
};

export const getProfile = (req,res) => {
    res.status(200).json({foodPartner : req.foodPartner});
};

export const logout = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure : false,
            sameSite : "strict",
            maxAge : 0
        });

        res.json({message : "Logged Out successfully!"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getPartnerById = async (req, res) => {
    const { id } = req.params;
    try {
        const foodPartner = await FoodPartner.findById(id);
        
        if (!foodPartner) {
            return res.status(404).json({ message: "Partner not found" });
        }

        const menu = await Food.find({ foodPartner: id }).sort({ createdAt: -1 });

        res.status(200).json({ foodPartner, menu });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    // Upload to Cloudinary
    const uploaded = await uploadBufferToCloudinary(
      req.file.buffer,
      req.file.originalname
    );
    // Find the food partner by ID
    const { id } = req.params;
    const foodPartner = await FoodPartner.findById(id);

    if (!foodPartner) {
      return res.status(404).json({ message: "Food Partner not found" });
    }

    foodPartner.profilePicture = uploaded.url;
    await foodPartner.save();

    res.status(200).json({
      success: true,
      message: "Profile picture updated successfully",
      profilePicture: uploaded.url,
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};