import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../helpers/api-errors.js';

export function errorMiddleware(error: Partial<ApiError>, req: Request, res: Response, next: NextFunction): void {
  const statusCode = error.statusCode ?? 500;
	const message = error.statusCode ? error.message : 'Internal Server Error';
  console.error(error);
  res.status(statusCode).json({error: message});
  return;
};

