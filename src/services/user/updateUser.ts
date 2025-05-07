import { Usuarios_tipo } from "@prisma/client";
import prisma from "../../database/dbConfig.js";

interface DataUser {
    email?: string,
    phone?: string,
    street?: string,
    numberHome?: string,
    postalCode?: string,
    city?: string,
    state?: string,
    type?: Usuarios_tipo
};

class UpdateDataUserService {
    async updateDataUserInDataBase(dataUser: DataUser, idUser: number) {
        try {
            const { email, phone, street, numberHome, postalCode, city, state, type } = dataUser as DataUser;

            if (!email && !phone && !street && !numberHome && !postalCode && !city && !state && !type) {
                return "fill in at least one field";
            };

            const updateDataBase = await prisma.usuarios.update({
                where: {
                    id_usuario: idUser
                },
                data: {
                    email: email,
                    telefone: phone,
                    rua: street,
                    numero: numberHome,
                    cep: postalCode,
                    cidade: city,
                    estado: state,
                    tipo: type
                }
            });

            if(updateDataBase){
                return "updated with successfuly";
            };

            return "updated fail";

        } catch (error) {
            return {message: error};
        };
    };
};

export {UpdateDataUserService};