import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    email: '',
    password: ''
    });

    const validateForm = ()=>{
     if(!formData.email.trim()) return toast.error("Email is Required");
     if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email Format!")
     if(!formData.password) return toast.error("Password is Required");
     if(formData.password.length < 6) return toast.error("Password must be atleast 6 characters");

     return true;
  };

    const handleSubmit = async (e)=>{
    e.preventDefault();
    const success = validateForm();
    if(success === true){
      try {
        const response = await axios.post("http://localhost:3000/api/user/login", formData, {
          withCredentials : true
        });

        alert("Login Successfully!");
        navigate("/home");
        toast.success("Logged in Successfully");
      } catch (error) {
        console.error("Error registering user:", error.response?.data || error.message);
        alert("Login failed");
        toast.error(error.response?.data?.message || "Login Failed");
      }
    }
  };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 via-red-400 to-yellow-300">
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-medium text-center text-red-500 mb-3 tracking-wide">
                    Zomato Login
                </h2>
                <p className="text-xl font-medium text-center mb-5">Welcome User — Sign in to continue</p>
                <form className="space-y-5" onSubmit={handleSubmit}>
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
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                            value={formData.password} 
                            onChange={(e)=>{setFormData({ ...formData, password : e.target.value })}}
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <label className="inline-flex items-center">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-red-400" />
                            <span className="ml-2 text-gray-600">Remember me</span>
                        </label>
                        <a href="/forgot-password" className="text-red-400 font-semibold hover:underline">
                            Forgot?
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
                    >
                        Log In
                    </button>
                </form>
                <p className="text-center text-gray-500 mt-6">
                    Don't have an account?{" "}
                    <a href="/" className="text-red-400 font-semibold hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;