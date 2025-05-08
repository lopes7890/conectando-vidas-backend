import { LastAnimalsService } from "../../services/animals/lastAnimals.js";

class LastAnimalsController {
    async getLastAnimals() {
        try {
            const serviceLastAnimals = new LastAnimalsService();
            const lastAnimals = await serviceLastAnimals.getLastAnimalsInDataBase();

            return lastAnimals;
        } catch (error) {
            return error;
        };
    };
};

export {LastAnimalsController};