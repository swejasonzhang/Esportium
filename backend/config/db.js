import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const con = await mongoose.connect("mongodb://localhost:27017/Esportium");
    console.log(`Connected to MongoDB ${con.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Connection Error - ${error} `);
  }
};

export default connectDB;
