import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/api-errors.js";
import { NotFoundError } from "../helpers/api-errors.js";
import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import prisma from "../database/dbConfig.js";


type TokenPayload = {
  id_usuario: number
}

export const verifyTokenLogin = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new UnauthorizedError("not authorized")
    }
    const secret = process.env.SECRET;

    if (!secret) {
      throw new NotFoundError("internal fail, try again");
    }

    const { id_usuario } = jwt.verify(authHeader, secret) as TokenPayload;

    const user = await prisma.usuarios.findFirst({
      where: {id_usuario: id_usuario}
    });

    if(!user){
      throw new UnauthorizedError("user notfound")
    }

    const { senha: _, ...loggedUser } = user

    req.user = loggedUser

    next();

};
