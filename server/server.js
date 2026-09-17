import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { protect } from "./middleware/authMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/habits",habitRoutes);

connectDB()

app.get("/api/protected", protect,(req,res)=>{
    res.json({message:"You are authorized",user:req.user});
});

app.get("/",(req,res)=>{
    res.send("API is running...");
});

app.listen(5000,()=>{
    console.log("Server running on port 5000");
});    
// MJdB3J01817Araju