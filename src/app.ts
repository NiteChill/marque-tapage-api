import express from "express";
import { authController } from "./controllers/auth.controller";

export const app = express();
app.use(express.json());

// app.use('/news',);
// app.use('/favorites',);
app.use('/auth', authController);