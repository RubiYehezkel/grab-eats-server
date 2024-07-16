import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "dotenv/config";
import myUserRoute from "./routes/MyUserRoute";

dotenv.config();
const PORT_NUMBER = 7000;

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to DB!"));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health OK" });
});

app.use("/api/my/user", myUserRoute);

app.listen(PORT_NUMBER, () => {
  console.log(`server running on port: ${PORT_NUMBER}`);
});
