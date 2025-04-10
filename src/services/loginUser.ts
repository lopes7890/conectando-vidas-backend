import prisma from "../database/dbConfig.js";
import { comparePasswordUser } from "../utils/comparePassword.js";
import { tokenLoginUser } from "../utils/generateTokenLogin.js";

class ServiceLoginUser {
    async serviceLogin(email: string, password: string) {
        try{
            const verify = await prisma.usuarios.findFirst({
                where: {email: email}
            });

            if (verify === null){
                return "user not found";
            };

            const compare = await comparePasswordUser(password, verify.senha);

            if (compare === null) {
                return "internal fail, try again";
            };
        
            if (compare === false) {
                return "incorrect password";
            };

            const token = tokenLoginUser(verify.id_usuario, verify.nome, verify.email);

            if(!token){
                return "internal fail, try again";
            };

            return token;
        } catch (error) {
            return {message: error}
        };
    };
};

export {ServiceLoginUser};