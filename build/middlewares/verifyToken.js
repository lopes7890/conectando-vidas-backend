import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/api-errors.js";
import { NotFoundError } from "../helpers/api-errors.js";
import "dotenv/config";
import prisma from "../database/dbConfig.js";
export const verifyTokenLogin = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new UnauthorizedError("not authorized");
    }
    ;
    const secret = process.env.SECRET;
    if (!secret) {
        throw new NotFoundError("internal fail, try again");
    }
    ;
    const { id_usuario } = jwt.verify(authHeader, secret);
    const user = await prisma.usuarios.findFirst({
        where: { id_usuario: id_usuario }
    });
    if (!user) {
        throw new UnauthorizedError("user notfound");
    }
    ;
    const { senha: _, ...loggedUser } = user;
    req.user = loggedUser;
    next();
};
