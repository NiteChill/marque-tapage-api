import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

/**
 * Error handler middleware
 * @param   {Error}        err  The error object
 * @param   {Request}      _req  The request object
 * @param   {Response}     res  The response object
 * @param   {NextFunction} _next The next function
 * @returns {void | Response}   Continues if the token is valid, otherwise returns an error
 */
export const errorHandler = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	if (err instanceof AppError)
		return res.status(err.status).json({ error: err.message });
	console.error(err.stack);
	res.status(500).json({ error: 'Internal Server Error' });
};