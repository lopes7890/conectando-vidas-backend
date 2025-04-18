import prisma from "../../database/dbConfig.js";

class DeleteServiceUser {
    async serviceDeleteUser(id: number) {
        try{
            const deletedUser = await prisma.usuarios.delete({
                where: {id_usuario: id}
            });
            if (deletedUser){
                return "user deleted with success";
            }

            return "user not existed";
            
        } catch (error) {
            console.log(error)
            return {message: error};
        };

    };
};

export {DeleteServiceUser};