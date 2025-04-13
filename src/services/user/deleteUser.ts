import prisma from "../../database/dbConfig.js";

class DeleteServiceUser {
    async serviceDeleteUser(id: number) {
        try{
            await prisma.usuarios.delete({
                where: {id_usuario: id}
            });

            return "user deleted with success";
        } catch (error) {
            console.log(error)
            return {message: error};
        };

    };
};

export {DeleteServiceUser};