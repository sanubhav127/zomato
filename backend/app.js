import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import { connect } from "./src/db/db.js";
import userRouter from "./src/routes/user.routes.js";
import foodPartnerRouter from "./src/routes/foodPartner.routes.js";
import foodRouter from "./src/routes/food.routes.js";

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/user", userRouter);
app.use("/api/foodPartner", foodPartnerRouter);
app.use("/api/reel", foodRouter);

server.listen(PORT, ()=>{
    console.log(`Server is running on Port : ${PORT}`);
    connect();
});