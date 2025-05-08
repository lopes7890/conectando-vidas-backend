// import class
import { AllAnimalsService } from "../../services/animals/allAnimals.js";

class AllDataAnimalController {
    async getAllAnimals() {
        try{
            const serviceAllAnimals = new AllAnimalsService();
            const allDataservice = await serviceAllAnimals.DataAllAnimalsInDataBase();

            return allDataservice;
        } catch (error) {
            return error
        };
    };
};

export {AllDataAnimalController};