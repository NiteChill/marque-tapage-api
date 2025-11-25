import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { getUserByUsername } from '../services/users.service';
import bcrypt from 'bcrypt';
import { isUser } from '../utils/users.utils';
import { User } from '../models/users.model';

const JWT_SECRET = process.env.JWT_SECRET;

export const authController = Router();

authController.post('/login', async (req: Request, res: Response) => {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			return res
				.status(400)
				.json({ error: 'Username and password are required' });
		}

		const user: User | unknown = await getUserByUsername(username);

		if (!isUser(user))
			return res.status(401).json({ error: 'Invalid username or password' });

		if (!JWT_SECRET) {
			console.error('FATAL: JWT_SECRET is not defined in .env');
			return res.status(500).json({ error: 'Internal Server Error' });
		}

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
		if (!passwordMatch)
			return res.status(401).json({ error: 'Invalid username or password' });

		const token = jwt.sign(
			{ id: user.id, username: user.username },
			JWT_SECRET,
			{ expiresIn: '7d' }
		);
		res.json({ token });
	} catch (error) {
		console.error('Error logging in:', error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
});
