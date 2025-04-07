import { Request } from "express";
import prisma from "../database/dbConfig.js";
import { encrypt } from "../utils/encryptPassword.js";
import { RegisterUserService } from "../services/registerUser.js";
import { Usuarios_tipo } from "@prisma/client";

interface User {
    name: string, 
    email: string, 
    password: string, 
    phone: string, 
    street: string, 
    numberHome: string, 
    postalCode: string, 
    city: string, 
    state: string, 
    age: number,
    type: Usuarios_tipo
}

class CreateUserController {
    async newUser(req: Request) {
        try{
        
            const { name, email, password, phone, street, numberHome, postalCode, city, state, age, type } = req.body as User;


            const verify = await prisma.usuarios.findFirst({
                where: {email: email}
            })

            if (verify !== null){
                return "existing user";
            };

            const encrypted = await encrypt(password);

            if (typeof encrypted === "object"){
                return "internal fail, try again";
            }

            const user = {
                name: name, 
                email: email, 
                password: encrypted, 
                phone: phone, 
                street: street, 
                numberHome: numberHome, 
                postalCode: postalCode, 
                city: city, 
                state: state, 
                age: age, 
                type: type
            } 

            const registerService = new RegisterUserService();
            
            const register = await registerService.registerUserInDataBase(user);

            if (typeof register === "object"){
                return "registered failed"
            }

            return "registered successfully";

        } catch (error) {
            console.log(error)
            return {message: error}
        }

    }
}


export {CreateUserController};