import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoose:", connection.connection.host);
  } catch (error) {
    console.log("Failed in connectDb:", error);
    process.exit(1);
  }
};
