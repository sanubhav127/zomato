# 🍽️ Zomato + Reels (MERN Stack)

A full-stack web application inspired by **Zomato**, enhanced with a **Reels feature** where restaurant owners can upload and manage short food or restaurant videos, and users can explore, watch, and visit restaurants directly from the reels.

---

## 🚀 Features

### 👥 Users
- View reels uploaded by restaurant owners.
- Like, comment, and dislike reels.
- Visit the restaurant’s detailed page directly from a reel.
- Browse restaurant menus, reels, and information.

### 🏢 Restaurant Owners
- Create and manage restaurant profiles.
- Upload and manage reels.
- Edit restaurant details.

---

## 🧩 Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer (for file uploads)
- Cloudinary / AWS S3 (for reel or image storage)
- bcrypt

---

## ⚙️ Installation & Setup

Clone the repository:
```bash
git clone https://github.com/sanubhav127/zomato.git
cd zomato

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

Frontend setup
cd frontend
cd vite-project
npm install
npm run dev

🧑‍💻 Author
Anubhav Singh
📧 [sanubhav127@gmail.com]
