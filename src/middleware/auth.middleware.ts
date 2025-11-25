import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/errors';

const JWT_SECRET = process.env.JWT_SECRET;
export interface AuthRequest extends Request {
	user?: any;
}

/**
 * Auth middleware
 * @param   {AuthRequest}     req  The request object
 * @param   {Response}        res  The response object
 * @param   {NextFunction}    next The next function
 * @returns {void | Response} Continues if the token is valid, otherwise returns an error
 */
export const authToken = (
	req: AuthRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) throw new AppError('Unauthorized', 401);

	if (!JWT_SECRET) {
		console.error('FATAL: JWT_SECRET is not defined in .env');
		throw new AppError('Internal Server Error', 500);
	}

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) throw new AppError('Invalid or expired token', 401);
		req.user = user;
		next();
	});
};
