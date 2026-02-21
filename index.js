import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import authRouter from "./routes/authRouter.js";
import noteRouter from "./routes/noteRouter.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5000;


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res)=>{
    res.send("THIS IS AN EXPRESS SERVER FOR NOTES WEB APP.")
})
app.use("/auth", authRouter);
app.use("/notes", noteRouter);

connectDb();

export default app;