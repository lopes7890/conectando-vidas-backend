import prisma from "../../database/dbConfig.js";
;
class UpdateDataUserService {
    async updateDataUserInDataBase(dataUser, idUser) {
        try {
            const dataToUpdate = {
                ...(dataUser.email !== undefined && { email: dataUser.email }),
                ...(dataUser.phone !== undefined && { telefone: dataUser.phone }),
                ...(dataUser.street !== undefined && { rua: dataUser.street }),
                ...(dataUser.numberHome !== undefined && { numero: dataUser.numberHome }),
                ...(dataUser.postalCode !== undefined && { cep: dataUser.postalCode }),
                ...(dataUser.city !== undefined && { cidade: dataUser.city }),
                ...(dataUser.state !== undefined && { estado: dataUser.state }),
                ...(dataUser.type !== undefined && { tipo: dataUser.type }),
            };
            if (Object.keys(dataToUpdate).length === 0) {
                return "fill in at least one field";
            }
            ;
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
