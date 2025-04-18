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
            await prisma.animais.delete({
                where: { id_animal: idAnimal }
            });
            return "animal deleted with success";
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
