// import class
import { UpdateAnimalService } from "../../services/animals/updateAnimal.js";
class UpdateDataAnimal {
    async animalUpdate(req) {
        try {
            const serviceUpdate = new UpdateAnimalService();
            const updateAnimal = await serviceUpdate.updateDataAninalInDataBase(req.body);
            return updateAnimal;
        }
        catch (error) {
            return { message: error };
        }
        ;
    }
    ;
}
;
export { UpdateDataAnimal };
