import prisma from "../../database/dbConfig.js";
;
class UpdateDataUserService {
    async updateDataUserInDataBase(dataUser, idUser) {
        try {
            const { email, phone, street, numberHome, postalCode, city, state, type } = dataUser;
            if (!email || !phone || !street || !numberHome || !postalCode || !city || !state || !type) {
                return "fill in at least one field";
            }
            ;
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
