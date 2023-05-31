import mongoose from "mongoose";
import config from "./config/index";
import app from "./app";

const port: number = 5000 || config.port;

const connectDB = async () => {
  try {
    await mongoose.connect(config.db_connect as string);
    console.log("db connected");
    app.listen(port, () => {
      console.log("successfully connected");
    });
  } catch (error) {
    console.log("db disconnected:", error);
  }
};

connectDB()

