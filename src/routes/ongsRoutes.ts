import { Request, Response, NextFunction, Router } from "express";

// import class
import { NewOngController } from "../controllers/ongs/newOngController.js";

const ongsRouter = Router();

ongsRouter.post("/cadastro/ong", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const newOngRegister = await new NewOngController().newOng(req)
        if (typeof newOngRegister === "string"){
            if (newOngRegister === "internal fail, try again"){
                res.status(500).json({message: newOngRegister});
                return;
            };

            if (newOngRegister === "fill in all the data"){
                res.status(409).json({message: newOngRegister});
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
    
})

export default ongsRouter;