import { NextFunction, Request, Response } from "express"
import { ApiError } from "../helpers/api-errors.js"
import { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error("internal error", err);

  return res.status(500).json({ message: "Internal Server Error" });
}
