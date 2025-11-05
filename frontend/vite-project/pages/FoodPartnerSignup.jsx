import React, { useState } from "react";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const FoodPartnerSignup = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    restaurantName: '',
    address: ''
    });

    const validateForm = ()=>{
    if(!formData.fullname.trim()) return toast.error("Full Name is Required");
    if(!formData.email.trim()) return toast.error("Email is Required");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email Format!")
    if(!formData.password) return toast.error("Password is Required");
    if(formData.password.length < 6) return toast.error("Password must be atleast 6 characters");
    if(!formData.restaurantName.trim()) return toast.error("Restaurant Name is Required");
    if(!formData.address.trim()) return toast.error("Address is Required");

    return true;
  };

    const handleSubmit = async (e)=>{
    e.preventDefault();
    const success = validateForm();
    if(success === true){
      try {
        const response = await axios.post("http://localhost:3000/api/foodPartner/signup", formData, {
          withCredentials : true
        });

        const id = response.data.foodPartner._id;
        
        alert("Sign Up Successful");
        navigate(`/partner-home/${id}`);
        toast.success("Account Created Successfully");
      } catch (error) {
        console.error("Error registering user:", error.response?.data || error.message);
        alert("Sign Up failed");
        toast.error(error.response?.data?.message || "Sign Up Failed");
      }
    }
  };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 via-red-400 to-yellow-300 pt-5 pb-5">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-medium text-center text-red-500 mb-3 tracking-wide">
                    Food Partner Signup
                </h2>
                <p className="text-xl font-medium text-center mb-3">Create Your Food Partner Account</p>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Owner's Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Owner's Name"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                            value={formData.fullname}
                            onChange={(e)=>{setFormData({ ...formData, fullname : e.target.value })}}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                            value={formData.email}
                            onChange={(e)=>{setFormData({ ...formData, email : e.target.value })}}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Create a password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                            value={formData.password}
                            onChange={(e)=>{setFormData({ ...formData, password : e.target.value })}}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Restaurant Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your restaurant name"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                            value={formData.restaurantName}
                            onChange={(e)=>{setFormData({ ...formData, restaurantName : e.target.value })}}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Address
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your restaurant address"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                            value={formData.address}
                            onChange={(e)=>{setFormData({ ...formData, address : e.target.value })}}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-500 mt-6">
                    Already have an account?{" "}
                    <a href="/foodPartnerLogin" className="text-red-400 font-semibold hover:underline">
                        Log In
                    </a>
                </p>
                <p className="text-center text-gray-500 mt-2">
                    Want to sign up as a user?{" "}
                    <a href="/" className="text-yellow-500 font-semibold hover:underline">
                        User Signup
                    </a>
                </p>
            </div>
        </div>
    );
};

export default FoodPartnerSignup;