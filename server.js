import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);

const dbuser = encodeURIComponent(process.env.DBUSER);
const dbpass = encodeURIComponent(process.env.DBPASS);

// Local MongoDB connection (for offline testing)
// mongoose.connect("mongodb://localhost:27017/mern-cafe").then(() => {
//   app.listen(5000, () => {
//     console.log("Server started");
//   });
// });

// MongoDB Atlas connection
mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0.rcpg0eg.mongodb.net/to-do?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    app.listen(8080, () => {
      console.log("Server started");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });