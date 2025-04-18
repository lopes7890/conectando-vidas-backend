import prisma from "../../database/dbConfig.js";
class DataAnimalService {
    async animalInDataBase(id) {
        try {
            if (!id) {
                return "fill in all the data";
            }
            ;
            const dataAnimal = await prisma.animais.findFirst({
                where: { id_animal: id }
            });
            if (dataAnimal) {
                return dataAnimal;
            }
            ;
            return "animal not existed";
        }
        catch (error) {
            return error;
        }
        ;
    }
    ;
}
;
export { DataAnimalService };
