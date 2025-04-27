// import class
import { UpdateDataUserService } from "../../services/user/updateUser.js";
class UpdateDataUserController {
    async updateDataUser(req) {
        try {
            const dataUser = req.user;
            if (dataUser.id_usuario) {
                const updateService = new UpdateDataUserService();
                const update = await updateService.updateDataUserInDataBase(req.body, dataUser.id_usuario);
                return update;
            }
            ;
        }
        catch (error) {
            return { message: error };
        }
        ;
    }
    ;
}
;
export { UpdateDataUserController };
