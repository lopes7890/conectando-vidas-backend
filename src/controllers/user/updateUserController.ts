import { Request } from "express";


// import class
import { UpdateDataUserService } from "../../services/user/updateUser.js";

class UpdateDataUserController {
    async updateDataUser(req: Request){
        try{

            const dataUser = req.user;

            if (dataUser.id_usuario){
                const updateService = new UpdateDataUserService();
                const update = await updateService.updateDataUserInDataBase(req.body, dataUser.id_usuario);
                return update;
            };
        } catch (error) {
            return {message: error};
        };
    };
};

export {UpdateDataUserController};