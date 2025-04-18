import prisma from "../../database/dbConfig.js";


class AllVoluntaryService {
    async allVoluntaryInDataBase() {
        try{
            const allData = await prisma.voluntariado.findMany();

            if(allData){
                return allData
            };

            return "no records in the database";
            
        } catch (error) {
            return error;
        };
    };
};

export {AllVoluntaryService};