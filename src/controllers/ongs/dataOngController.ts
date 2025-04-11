import { Request } from "express";


import { DataOngService } from "../../services/ongs/dataOng.js";

class DataOngController {
    async dataOng(req: Request){
        try{
            const dataService = new DataOngService();
            const data = await dataService.DataOngInDataBase(req.body);

            return data;
        } catch (error) {
            return error;
        };
    };
};

export {DataOngController}