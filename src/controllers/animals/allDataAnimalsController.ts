import { AllAnimalsService } from "../../services/animals/allAnimals.js";

class AllDataAnimalController {
    async getAllAnimals() {
        try{
            const service = new AllAnimalsService();
            const allDataservice = await service.DataAllAnimalsInDataBase();

            return allDataservice;
        } catch (error) {
            return error
        }
    };
};

export {AllDataAnimalController};