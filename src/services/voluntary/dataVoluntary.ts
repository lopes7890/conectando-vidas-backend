import prisma from "../../database/dbConfig.js";

class DataVoluntaryService {
    async dataVoluntaryInDataBase(id: number) {
        try {

            if (!id){
                return "fill in all the data";
            };

            const dataInDataBase = await prisma.voluntariado.findFirst({
                where: {id_voluntariado: id}
            });

            if (dataInDataBase){
                return dataInDataBase;
            };

            return "voluntary not existed";


        } catch (error) {
            return error;
        };
    };
};

export {DataVoluntaryService};