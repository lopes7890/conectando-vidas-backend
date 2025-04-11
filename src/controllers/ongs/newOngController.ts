import { Request } from "express";


import { NewOngService } from "../../services/ongs/registerOng.js";

class NewOngController {
    async newOng(req: Request) {
        try{
            const newServiceOng = new NewOngService();
            const registerNewOng = await newServiceOng.registerOngInDataBase(req.body);

            if (typeof registerNewOng === "object"){
                return "internal fail, try again";
            };

            return registerNewOng;
        } catch (error) {
            return {message: error};
        };
    };
};

export {NewOngController};