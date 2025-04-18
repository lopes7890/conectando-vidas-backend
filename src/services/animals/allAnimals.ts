import prisma from "../../database/dbConfig.js";


class AllAnimalsService {
    async DataAllAnimalsInDataBase () {
        try {
            const allDataInDataBase = await prisma.animais.findMany()

            if (allDataInDataBase){
                return allDataInDataBase
            }

            return "no records in the database";
        } catch (error) {
            return error
        }
    };
};

export {AllAnimalsService};