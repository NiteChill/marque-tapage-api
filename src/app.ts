import express from "express";
import { authController } from "./controllers/auth.controller";
import { newsController } from "./controllers/news.controller";

export const app = express();
app.use(express.json());

app.use('/news', newsController);
// app.use('/favorites',);
app.use('/auth', authController);