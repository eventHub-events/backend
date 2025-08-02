import express from "express";
import dotenv from 'dotenv';
import userRouts  from "../src/interface/routes/user/userRouts"
import { DbConnection } from "./config/mongoose/DbConnection";
import cors from "cors";

dotenv.config()

const app= express();
DbConnection.connect()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend origin
  credentials: true,               // Allow cookies if using HTTP-only cookies
}));
app.use("/api/user",userRouts );

app.listen(process.env.PORT,()=>{
  console.log("server is running ")
})