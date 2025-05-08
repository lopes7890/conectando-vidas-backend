import { AllVoluntaryService } from "../../services/voluntary/allVoluntarys.js";
class DataAllVoluntarysController {
    async allVoluntary() {
        try {
            const serviceVoluntary = new AllVoluntaryService();
            const serviceAllVoluntary = await serviceVoluntary.allVoluntaryInDataBase();
            return serviceAllVoluntary;
        }
        catch (error) {
            return error;
        }
        ;
    }
    ;
}
;
export { DataAllVoluntarysController };
