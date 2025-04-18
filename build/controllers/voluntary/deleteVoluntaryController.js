import { DeleteVoluntaryService } from "../../services/voluntary/deleteVoluntary.js";
class DeleteVoluntaryController {
    async deleteVolutary(req) {
        try {
            const service = new DeleteVoluntaryService();
            const deleteService = service.deleteVoluntaryInDataBase(req.body);
            return deleteService;
        }
        catch (error) {
            return { message: error };
        }
    }
    ;
}
;
export { DeleteVoluntaryController };
