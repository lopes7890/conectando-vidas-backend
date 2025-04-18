import { Router, Request, Response, NextFunction } from "express";
import { verifyTokenLogin } from "../middlewares/verifyToken.js";

import { NewVoluntaryController } from "../controllers/voluntary/newVoluntaryController.js";

const voluntaryRoutes = Router();

voluntaryRoutes.post("/cadastro/voluntario", verifyTokenLogin, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const voluntary = await new NewVoluntaryController().newVoluntary(req);
        if (typeof voluntary === "string"){
            if (voluntary === "fill in all the data") {
                res.status(400).json({message: voluntary});
                return;
            };

            if (voluntary === "internal fail, try again") {
                res.status(500).json({message: voluntary});
                return;
            };

            if (voluntary === "voluntary registered successfully") {
                res.status(200).json({message: voluntary});
                return;
            };
        };

        res.status(500).json({error: voluntary})
        return;
    } catch (error) {
        next(error);
    };
});

voluntaryRoutes.get("/voluntario", verifyTokenLogin, async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    };
});

voluntaryRoutes.delete("/voluntario", verifyTokenLogin, async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    };
});