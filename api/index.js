import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

// Routes
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import listingRouter from "./routes/listing.route.js"


// packeges 

import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDB!");
    })
    .catch((error) => {
        console.log(error);
    });


// Test API
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);




app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Server Error...';
    const databaseError = err.errors && err.errors.password && err.errors.password.message;

    
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});