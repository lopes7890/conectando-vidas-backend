import { Request } from "express";

import { NewVoluntaryService } from "../../services/voluntary/registerVoluntary.js";

class NewVoluntaryController {
    async newVoluntary(req: Request){
        try{
            const dataUser = req.user
            const serviceRegisterVoluntary = new NewVoluntaryService()
            const voluntaryService = await serviceRegisterVoluntary.registerVoluntaryInDataBase(req.body, dataUser.id_usuario);

            if (typeof voluntaryService === "object"){
                return "internal fail, try again";
            };
            
            return voluntaryService;
        } catch (error) {
            return {message: error};
        };
    };
};

export {NewVoluntaryController};