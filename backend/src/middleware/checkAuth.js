import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import FoodPartner from "../models/foodPartner.model.js";

//User Authentication Middleware
export const checkAuthUser = async (req, res, next) => {
   try {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message : "Unauthorised access! Authorisation denied"});
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if(!decode){
        return res.status(401).json({message : "Unauthorised access! Authorisation denied"});
    }

    const user = await User.findById(decode._id);
    req.user = user;
    
    return next();
   
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

//Food Partner Authentication Middleware
export const checkAuthPartner = async (req, res, next) => {
   try {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message : "Unauthorised access! Authorisation denied"});
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if(!decode){
        return res.status(401).json({message : "Unauthorised access! Authorisation denied"});
    }

    const foodPartner = await FoodPartner.findById(decode._id);
    req.foodPartner = foodPartner;

    return next();

   } catch (error) {
       console.error("Token verification failed:", error.message);
       return res.status(403).json({ message: "Invalid or expired token" });
   }
};
