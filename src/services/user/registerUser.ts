import prisma from "../../database/dbConfig.js";
import { Usuarios_tipo } from "@prisma/client";
import { encrypt } from "../../utils/encryptPassword.js";

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
};

class RegisterUserService{
        async registerUserInDataBase(userData: User): Promise<string | object> {
            try {
                const { name, email, password, phone, street, numberHome, postalCode, city, state, age, type } = userData as User;
                
                if (!name || !email || !password || 
                    !phone || !street || !numberHome || 
                    !postalCode || !city || !state || !age || !type){
                        return "fill in all the data";
                };

                const verify = await prisma.usuarios.findFirst({
                    where: {email: email}
                });

                if (verify !== null){
                    return "existing user";
                };
                
                const encrypted = await encrypt(password);

                if (encrypted === null){
                    return "internal fail, try again";
                };

                await prisma.usuarios.create({
                    data: {
                        nome: name,
                        email: email,
                        senha: encrypted,
                        telefone: phone,
                        rua: street,
                        numero: numberHome,
                        cep: postalCode,
                        cidade: city,
                        estado: state,
                        idade: age,
                        tipo: type
                    }   
                });
    
            return "registered successfully";

        } catch (error) {
            return {message: error}
        };
    };
};

export {RegisterUserService};