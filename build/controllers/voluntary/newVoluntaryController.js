import { NewVoluntaryService } from "../../services/voluntary/registerVoluntary.js";
class NewVoluntaryController {
    async newVoluntary(req) {
        try {
            const dataUser = req.user;
            const service = new NewVoluntaryService();
            const voluntaryService = await service.registerVoluntaryInDataBase(req.body, dataUser.id_usuario);
            if (typeof voluntaryService === "object") {
                return "internal fail, try again";
            }
            ;
            return voluntaryService;
        }
        catch (error) {
            return { message: error };
        }
        ;
    }
    ;
}
;
export { NewVoluntaryController };
