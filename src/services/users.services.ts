import db from "../db/database";
import { User } from "../models/users.model";

export const getUserByUsername = (username: string): User | unknown => {
    return db.prepare("SELECT * FROM users WHERE username = ?").get(username);
};

export const getUserById = (id: number): User | unknown => {
    return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
};