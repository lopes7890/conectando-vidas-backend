// import class
import { DeleteAnimalService } from "../../services/animals/deleteAnimal.js";
class DeleteAnimal {
    async removeAnimal(req) {
        try {
            const deleteService = new DeleteAnimalService();
            const deleteAnimal = await deleteService.deleteAnimalInDataBase(req.body);
            return deleteAnimal;
        }
        catch (error) {
            return { message: error };
        }
        ;
    }
    ;
}
;
export { DeleteAnimal };
