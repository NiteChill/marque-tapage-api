import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { authController } from "./controllers/auth.controller";

dotenv.config();

export const app = express();
app.use(express.json());

// app.use('/news',);
// app.use('/favorites',);
app.use('/auth', authController);