import { DataVoluntaryService } from "../../services/voluntary/dataVoluntary.js";

class DataVoluntaryController {
    async voluntaryData (id: number) {
        try {
            const service = new DataVoluntaryService();
            const dataService = await service.dataVoluntaryInDataBase(id);

            return dataService;
        } catch (error) {
            return error
        };
    };
};

export {DataVoluntaryController};