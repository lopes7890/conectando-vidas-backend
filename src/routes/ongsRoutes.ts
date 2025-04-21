import { Request, Response, NextFunction, Router } from "express";

// import class
import { NewOngController } from "../controllers/ongs/newOngController.js";
import { DataOngController } from "../controllers/ongs/dataOngController.js";
import { DeleteOng } from "../controllers/ongs/deleteOngContoller.js";

const ongsRouter: Router = Router();

ongsRouter.post("/cadastro/ong", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const newOngRegister: string | object = await new NewOngController().newOng(req)
        if (typeof newOngRegister === "string"){
            if (newOngRegister === "internal fail, try again"){
                res.status(500).json({message: newOngRegister});
                return;
            };

            if (newOngRegister === "fill in all the data"){
                res.status(400).json({message: newOngRegister});
                return;
            };

            if (newOngRegister === "ONG registered successfully"){
                res.status(200).json({message: newOngRegister});
                return;
            };
        }
        res.status(500).json({error: newOngRegister});
    } catch (error) {
        next(error);
    };
});

ongsRouter.get("/ong", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const dataOng: string | object | unknown = await new DataOngController().dataOng(req);
        if (typeof dataOng === "string"){
            if(dataOng === "ONG not existed" || dataOng === "fill in all the data"){
                res.status(400).json({message: dataOng});
                return;
            };
        };

        if (typeof dataOng === "object"){
            res.status(200).json(dataOng);
            return;
        }

        res.status(500).json({error: dataOng});
        return;

    } catch (error) {
        next(error);
    };
});

ongsRouter.delete("/ong", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const deleteOng: string | object = await new DeleteOng().ongDelete(req);
        if (typeof deleteOng === "string"){
            if (deleteOng === "fill in all the data" || deleteOng === "ONG not existed"){
                res.status(400).json({message: deleteOng});
                return;
            };

            res.status(200).json({message: deleteOng});
            return;
        };

        res.status(500).json({error: deleteOng});
        return;
    } catch (error) {
        next(error)
    };
});

export default ongsRouter;