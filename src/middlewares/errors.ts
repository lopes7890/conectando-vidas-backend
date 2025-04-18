import { Request, Response, NextFunction } from 'express'

export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
  console.error(err)
  res.status(500).json({ error: "internal fail, try again" })
}

