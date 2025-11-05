import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const foodSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        trim: true
    },
    video : {
        url : String,
        public_id : String
    },
    price : {
        type: Number,
        required: true,
    },
    description : {
        type: String,
    },
    foodPartner : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodPartner"
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    comments: [commentSchema],
    createdAt : {
        type: Date,
        default: Date.now
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
});

const Food = mongoose.model("Food", foodSchema);
export default Food;