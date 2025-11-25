import { Request, Response, NextFunction } from "express";
import { getUserByUsername } from "../services/users.services";
import { User } from "../models/users.model";
import { isUser } from "../utils/users.utils";
import bcrypt from "bcrypt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const user: User | unknown = getUserByUsername(username);
  if (!isUser(user)) return res.status(401).json({ message: "Invalid username or password" });
  bcrypt.compare(password, user.password_hash, (err, result) => {
    if (err) return res.status(500).json({ message: "Internal server error" });
    if (!result) return res.status(401).json({ message: "Invalid username or password" });
    next();
  });
};