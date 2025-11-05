# ⚙️ Backend - Zomato + Reels App

This is the **backend server** for the Zomato + Reels MERN project.  
Built using **Node.js**, **Express.js**, and **MongoDB**, it handles authentication, user and restaurant management, and media upload APIs.

---

## 🚀 Features

- User and restaurant registration & login (JWT-based)
- Upload & manage reels (video upload via Multer + Cloudinary)
- Restaurant profile management
- Secure API routes for owners and users
- Cookies-based authentication for frontend integration

---

## 🧩 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Multer** (for file uploads)
- **Cloudinary SDK**
- **JWT Authentication**
- **bcrypt** (for password hashing)
- **cookie-parser** and **cors**

---

## ⚙️ Setup & Run

```bash
Backend Setup

cd backend
npm install
npx nodemon

🔐 Environment Variables
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

🧑‍💻 Author
Anubhav Singh
📧 [sanubhav127@gmail.com]