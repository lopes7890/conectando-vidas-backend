import { DataVoluntaryService } from "../../services/voluntary/dataVoluntary.js";

class DataVoluntaryController {
    async voluntaryData (id: number) {
        try {
            const serviceDataVoluntary = new DataVoluntaryService();
            const dataService = await serviceDataVoluntary.dataVoluntaryInDataBase(id);

            return dataService;
        } catch (error) {
            return error
        };
    };
};

export {DataVoluntaryController};