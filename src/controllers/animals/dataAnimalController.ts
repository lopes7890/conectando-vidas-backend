// import class
import { DataAnimalService } from "../../services/animals/dataAnimal.js";

class DataAnimalController {
    async getAnimal(id: number) {
        try{
            const serviceDataAnimal = new DataAnimalService();

            const dataAnimal = await serviceDataAnimal.animalInDataBase(id);
            return dataAnimal;

        } catch (error) {
            return error;
        };
    };
};

export {DataAnimalController};