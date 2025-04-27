import { Request } from "express";

// import class
import { DeleteServiceUser } from "../../services/user/deleteUser.js";

class DeleteUserController {
    async userDelete(req: Request) {
        try{
            const dataUser = req.user;

            if(dataUser.id_usuario){
                const deleteService = new DeleteServiceUser();
                const deleteUser = await deleteService.serviceDeleteUser(dataUser.id_usuario);
                return deleteUser;
            };           
        } catch (error) {
            return {message: error};
        };
    };
};

export {DeleteUserController};