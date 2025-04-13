import prisma from "../../database/dbConfig.js";

interface IdAnimal {
    idAnimal: number;
};

class DeleteAnimalService {
    async deleteAnimalInDataBase(id: IdAnimal) {
        try{
            const { idAnimal } = id as IdAnimal;

            if(!idAnimal){
                return "fill in all the data";
            };
    
            await prisma.animais.delete({
                where: {id_animal: idAnimal}
            });
    
            return "animal deleted with success";
        } catch (error) {
            return {message: error};
        };
    };
};

export {DeleteAnimalService};