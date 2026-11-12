import mongoose from "mongoose";

/**
 * Establish a MongoDB connection using the environment variable `MONGO_URL`.
 * This function is called from `Backend/index.js`. It safely handles the case
 * where the URL is not defined (e.g., local development without a DB).
 */
export const connectionDB = async () => {
  const mongoUrl = process.env.MONGO_URL?.trim();
  if (!mongoUrl) {
    throw new Error("MONGO_URL not set in environment.");
  }

  try {
    // `useNewUrlParser` & `useUnifiedTopology` are defaults in Mongoose 6+
    await mongoose.connect(mongoUrl, {
      dbName: process.env.DB_NAME,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
};

export default mongoose;
