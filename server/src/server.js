// Import dot env
import dotenv from "dotenv";
dotenv.config();

// Import packages
import express from "express";
import cors from "cors";
import morgan from "morgan";
import session from "express-session";

// Import db connection util function
import { connectDb } from "./database/connectDb.js";

// Create express app
const app = express();
const port = process.env.PORT;

// Import routes
import signupRoute from "./routes/signupRoute.js";
import loginRoute from "./routes/loginRoute.js";
import authRoute from "./routes/authRoute.js";

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

// Use Routes
app.use("/api/signup", signupRoute);
app.use("/api/login", loginRoute);
app.use("/api/auth", authRoute);

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
