import mongoose from "mongoose";

const foodPartnerSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    restaurantName : {
        type : String,
        required : true,
        unique : true
    },
    address : {
        type : String,
        required : true
    },
    profilePicture : {
        type : String
    },
    rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
    },
}, { timestamps : true });

const FoodPartner = mongoose.model("FoodPartner", foodPartnerSchema);
export default FoodPartner;