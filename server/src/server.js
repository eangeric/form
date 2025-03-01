// Import dot env
import dotenv from "dotenv";
dotenv.config();

// Import packages
import express from "express";
import cors from "cors";
import morgan from "morgan";

// Import db connection util function
import { connectDb } from "./database/connectDb.js";

// Create express app
const app = express();
const port = process.env.PORT;

// Import routes
import signupRoute from "./routes/signupRoute.js";

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Use Routes
app.use("/api/signup", signupRoute);

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDb();
    // Connect to Server
    app.listen(port, () => {
      console.log("Server started on", port);
    });
  } catch (error) {
    console.log("Error in startServer", error);
    process.exit(1);
  }
};

startServer();
