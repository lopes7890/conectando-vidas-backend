import prisma from "../database/dbConfig.js";
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

export const registerUserInDataBase = async (user: User) => {
    try {

        await prisma.usuarios.create({
            data: {
                nome: user.name,
                email: user.email,
                senha: user.password,
                telefone: user.phone,
                rua: user.street,
                numero: user.numberHome,
                cep: user.postalCode,
                cidade: user.city,
                estado: user.state,
                idade: user.age,
                tipo: user.type
            }   
        });

        return "registered successfully";
    } catch (error) {
        return {message: error}
    }
}