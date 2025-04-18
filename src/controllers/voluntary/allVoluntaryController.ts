import { AllVoluntaryService } from "../../services/voluntary/allVoluntarys.js";

class DataAllVoluntarysController {
    async allVoluntary() {
        try{
            const service = new AllVoluntaryService();
            const serviceAllVoluntary = await service.allVoluntaryInDataBase();

            return serviceAllVoluntary;
        } catch (error) {
            return error;
        };
    };
};

export {DataAllVoluntarysController};