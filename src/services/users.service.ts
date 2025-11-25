import db from "../db/database";
import { User } from "../models/users.model";

/**
 * Get user by username
 * @param   {string}         username Username
 * @returns {User | unknown} User object
 */
export const getUserByUsername = (username: string): User | unknown => {
    return db.prepare("SELECT * FROM users WHERE username = ?").get(username);
};

/**
 * Get user by id
 * @param   {number}         id User id
 * @returns {User | unknown} User object
 */
export const getUserById = (id: number): User | unknown => {
    return db.prepare("SELECT * FROM users WHERE id = ?").get(id);
};