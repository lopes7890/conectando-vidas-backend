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

            const dataToUpdate: any = {};

            for (const [key, value] of Object.entries(dataUser)) {
              if (value !== undefined && value !== null) {
                switch (key) {
                  case 'phone': dataToUpdate.telefone = value; break;
                  case 'street': dataToUpdate.rua = value; break;
                  case 'numberHome': dataToUpdate.numero = value; break;
                  case 'postalCode': dataToUpdate.cep = value; break;
                  case 'city': dataToUpdate.cidade = value; break;
                  case 'state': dataToUpdate.estado = value; break;
                  case 'type': dataToUpdate.tipo = value; break;
                  case 'email': dataToUpdate.email = value; break;
                }
              }
            }

            if (Object.keys(dataToUpdate).length === 0) {
                return "fill in at least one field";
            };

            const updateDataBase = await prisma.usuarios.update({
                where: {
                    id_usuario: idUser
                },
                data: dataToUpdate
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