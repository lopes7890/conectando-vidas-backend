import prisma from "../../database/dbConfig.js";

interface IdVoluntary {
    id_voluntary: number
};

class DeleteVoluntaryService {
    async deleteVoluntaryInDataBase (id: IdVoluntary, idUser: number) {
        try {

            const { id_voluntary } = id as IdVoluntary;

            if (!id_voluntary) {
                return "fill in all the data";
            };

            const deletedVoluntary = await prisma.voluntariado.delete({
                where: {id_voluntariado: id_voluntary}
            });

            if(deletedVoluntary){
                await prisma.usuarios.update({
                    where: {
                        id_usuario: idUser
                    },
                    data: {
                        tipo: "adotante"
                    }
                });
                
                return "voluntary deleted successfully";
            }

            return "voluntary not existed";
            

        } catch (error) {
            return {message: error};
        };
    };
};

export {DeleteVoluntaryService};