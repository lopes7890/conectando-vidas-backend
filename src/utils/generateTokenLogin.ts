import jwt from "jsonwebtoken";
import "dotenv/config";

export const tokenLoginUser = (id: number): string | null => {
    try{
        const secret = process.env.SECRET;

        if(secret){
            return jwt.sign({id_usuario: id}, secret, {expiresIn: "1d"})
        };

        return null;

    } catch (error) {
        console.log(error);
        return null;
    };
};