import { DeleteVoluntaryService } from "../../services/voluntary/deleteVoluntary.js";
class DeleteVoluntaryController {
    async deleteVolutary(req) {
        try {
            const dataUser = req.user;
            if (dataUser.id_usuario) {
                const serviceDelete = new DeleteVoluntaryService();
                const deleteService = serviceDelete.deleteVoluntaryInDataBase(req.body, dataUser.id_usuario);
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
