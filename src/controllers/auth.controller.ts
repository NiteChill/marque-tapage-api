import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { getUserByUsername } from '../services/users.service';
import bcrypt from 'bcrypt';
import { isUser } from '../utils/users.utils';
import { User } from '../models/users.model';
import { AppError } from '../utils/errors';

const JWT_SECRET = process.env.JWT_SECRET;

export const authController = Router();

authController.post('/login', async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		if (!username || !password)
			throw new AppError('Username and password are required', 400);

		const user: User | unknown = await getUserByUsername(username);

		if (!isUser(user)) throw new AppError('Invalid username or password', 401);

		if (!JWT_SECRET) {
			console.error('FATAL: JWT_SECRET is not defined in .env');
			throw new AppError('Internal Server Error', 500);
		}

		const passwordMatch = await bcrypt.compare(password, user.password_hash);
		if (!passwordMatch) throw new AppError('Invalid username or password', 401);

		const token = jwt.sign(
			{ id: user.id, username: user.username },
			JWT_SECRET,
			{ expiresIn: '7d' }
		);
		res.json({ token });
	} catch (error) {
		console.error('Error logging in:', error);
		throw new AppError('Internal Server Error', 500);
	}
});
