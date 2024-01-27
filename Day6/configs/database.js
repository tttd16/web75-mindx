import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const dbConfig = process.env.MONGO_CONNECT;
    const connect = await mongoose.connect(dbConfig);
    console.log(`MongoDB connected ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    console.log(" Error connect mongodb");
  }
};

export default connectDB;
