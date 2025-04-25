import prisma from "../../database/dbConfig.js";
import { deleteImage } from "../../utils/deleteImages.js";
;
class DeleteAnimalService {
    async deleteAnimalInDataBase(id) {
        try {
            const { id_animal } = id;
            if (!id_animal) {
                return "fill in all the data";
            }
            ;
            const deletedAnimal = await prisma.animais.delete({
                where: { id_animal: id_animal }
            });
            if (deletedAnimal) {
                if (deletedAnimal.foto) {
                    deleteImage(deletedAnimal.foto);
                }
                ;
                return "animal deleted with success";
            }
            ;
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
