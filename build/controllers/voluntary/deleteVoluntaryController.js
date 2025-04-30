import { DeleteVoluntaryService } from "../../services/voluntary/deleteVoluntary.js";
class DeleteVoluntaryController {
    async deleteVolutary(req) {
        try {
            const dataUser = req.user;
            if (dataUser.id_usuario) {
                const service = new DeleteVoluntaryService();
                const deleteService = service.deleteVoluntaryInDataBase(req.body, dataUser.id_usuario);
                return deleteService;
            }
            ;
        }
        catch (error) {
            return { message: error };
        }
    }
    ;
}
;
export { DeleteVoluntaryController };
