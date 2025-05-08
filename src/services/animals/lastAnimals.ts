import prisma from "../../database/dbConfig.js";

class LastAnimalsService {
    async getLastAnimalsInDataBase() {
        try {
            const dataLastAnimals = await prisma.animais.findMany({
                orderBy: {
                    id_animal: 'desc'
                },
                take: 5
            });

            if (dataLastAnimals){
                return dataLastAnimals;
            };

            return "failed to fetch animals";
        } catch (error) {
            return error;
        };
    }; 
};

export {LastAnimalsService};