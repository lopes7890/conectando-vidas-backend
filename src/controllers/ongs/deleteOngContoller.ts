import { Request } from "express";

// import class
import { DeleteOngService } from "../../services/ongs/deleteOng.js";


class DeleteOng {
    async ongDelete(req: Request) {
        try{
            const deleteService = new DeleteOngService();
            const deleteOng = await deleteService.serviceDeleteOng(req.body);
            return deleteOng;
        } catch (error) {
            return {message: error};
        };
    };
};

export {DeleteOng};