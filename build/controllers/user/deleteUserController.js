// import class
import { DeleteServiceUser } from "../../services/user/deleteUser.js";
class DeleteUser {
    async userDelete(req) {
        try {
            const dataUser = req.user;
            if (dataUser.id_usuario) {
                const deleteService = new DeleteServiceUser().serviceDeleteUser(dataUser.id_usuario);
                return deleteService;
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
export { DeleteUser };
