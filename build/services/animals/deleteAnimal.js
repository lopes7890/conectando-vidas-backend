import prisma from "../../database/dbConfig.js";
;
class DeleteAnimalService {
    async deleteAnimalInDataBase(id) {
        try {
            const { idAnimal } = id;
            if (!idAnimal) {
                return "fill in all the data";
            }
            ;
            const deletedAnimal = await prisma.animais.delete({
                where: { id_animal: idAnimal }
            });
            if (deletedAnimal) {
                return "animal deleted with success";
            }
            return "animal not existed";
        }
        catch (error) {
            return { message: error };
        }
        ;
    }
    ;
}
;
export { DeleteAnimalService };
