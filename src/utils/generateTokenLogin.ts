import jwt from "jsonwebtoken";
import "dotenv/config";

export const tokenLoginUser = (id: number, name: string, email: string): string | null => {
    try{
        const secret = process.env.SECRET;

        if(secret){
            return jwt.sign({id: id, name: name, email: email}, secret, {expiresIn: "1d"})
        };

        return null;

    } catch (error) {
        console.log(error);
        return null;
    };
};