import prisma from "../../database/dbConfig.js";

interface IdAnimal {
    id_animal: number
};

class UpdateAnimalService {
    async updateDataAninalInDataBase(dataAnimal: IdAnimal) {
        try{
            const { id_animal } = dataAnimal as IdAnimal;

            if(!id_animal){
                return "fill in all the data";
            };

            const update = await prisma.animais.update({
                where: {
                    id_animal: id_animal
                },
                data: {
                    status_adocao: "adotado"
                }       
            });

            if(update){
                return "updated with successfuly";
            };

            return "updated fail";

        } catch (error) {
            return {message: error};
        };
    };
};

export {UpdateAnimalService};