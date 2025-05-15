import prisma from "../../database/dbConfig.js";
;
class UpdateDataUserService {
    async updateDataUserInDataBase(dataUser, idUser) {
        try {
            const dataToUpdate = {};
            for (const [key, value] of Object.entries(dataUser)) {
                if (value !== undefined && value !== null) {
                    switch (key) {
                        case 'phone':
                            dataToUpdate.telefone = value;
                            break;
                        case 'street':
                            dataToUpdate.rua = value;
                            break;
                        case 'numberHome':
                            dataToUpdate.numero = value;
                            break;
                        case 'postalCode':
                            dataToUpdate.cep = value;
                            break;
                        case 'city':
                            dataToUpdate.cidade = value;
                            break;
                        case 'state':
                            dataToUpdate.estado = value;
                            break;
                        case 'type':
                            dataToUpdate.tipo = value;
                            break;
                        case 'email':
                            dataToUpdate.email = value;
                            break;
                    }
                }
            }
            if (Object.keys(dataToUpdate).length === 0) {
                return "fill in at least one field";
            }
            ;
            if (dataUser.id_voluntary && dataToUpdate.tipo == "adotante") {
                await prisma.voluntariado.delete({
                    where: {
                        id_voluntariado: Number(dataUser.id_voluntary)
                    }
                });
            }
            const updateDataBase = await prisma.usuarios.update({
                where: {
                    id_usuario: idUser
                },
                data: dataToUpdate
            });
            if (updateDataBase) {
                return "updated with successfuly";
            }
            ;
            return "updated fail";
        }
        catch (error) {
            return { message: error };
        }
        ;
    }
    ;
}
;
export { UpdateDataUserService };
