import express, { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "dotenv/config";
import myUserRoute from "./routes/MyUserRoute";
import myRestaurantRoute from "./routes/MyRestaurantRoute";

dotenv.config();
const PORT_NUMBER = 7000;

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to DB!"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health OK" });
});

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);

app.listen(PORT_NUMBER, () => {
  console.log(`server running on port: ${PORT_NUMBER}`);
});
