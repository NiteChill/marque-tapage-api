import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
export interface AuthRequest extends Request {
	user?: any;
}

/**
 * Auth middleware
 * @param   {AuthRequest}  req  The request object
 * @param   {Response}     res  The response object
 * @param   {NextFunction} next The next function
 * @returns {void | Response}   Continues if the token is valid, otherwise returns an error
 */
export const authToken = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) return res.status(401).json({ error: 'Unauthorized' });

	if (!JWT_SECRET) {
		console.error('FATAL: JWT_SECRET is not defined in .env');
		return res.status(500).json({ error: 'Internal Server Error' });
	}

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) return res.status(401).json({ error: 'Invalid or expired token' });
		req.user = user;
		next();
	});
};
