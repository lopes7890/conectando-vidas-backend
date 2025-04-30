import { Router, Request, Response, NextFunction } from "express";
import { verifyTokenLogin } from "../middlewares/verifyToken.js";

import { NewVoluntaryController } from "../controllers/voluntary/newVoluntaryController.js";
import { DataVoluntaryController } from "../controllers/voluntary/dataVoluntaryController.js";
import { DeleteVoluntaryController } from "../controllers/voluntary/deleteVoluntaryController.js";
import { DataAllVoluntarysController } from "../controllers/voluntary/allVoluntaryController.js";

const voluntaryRoutes: Router = Router();

voluntaryRoutes.post("/cadastro/voluntario", verifyTokenLogin, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const voluntary: string | object = await new NewVoluntaryController().newVoluntary(req);
        if (typeof voluntary === "string"){
            if (voluntary === "fill in all the data" || voluntary === "the user is already a volunteer") {
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

voluntaryRoutes.get("/voluntario/:id_voluntario", verifyTokenLogin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idVoluntary: string = req.params.id_voluntario;
        const dataVoluntary: string | object | unknown = await new DataVoluntaryController().voluntaryData(Number(idVoluntary));

        if (typeof dataVoluntary === "string"){
            if (dataVoluntary === "fill in all the data" || dataVoluntary === "voluntary not existed"){
                res.status(400).json({message: dataVoluntary});
                return;
            }
        }

        if (typeof dataVoluntary === "object"){
            res.status(200).json(dataVoluntary);
            return;
        }

        res.status(500).json({error: dataVoluntary});
        return;


    } catch (error) {
        next(error);
    };
});

voluntaryRoutes.get("/voluntarios", verifyTokenLogin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const allDataVoluntary: string | object | unknown = await new DataAllVoluntarysController().allVoluntary();

        if (typeof allDataVoluntary === "string"){
            res.status(500).json({message: allDataVoluntary});
            return;
        };

        if (typeof allDataVoluntary === "object"){
            res.status(200).json(allDataVoluntary);
            return;
        }

        res.status(500).json({error: allDataVoluntary});
        return;

    } catch (error) {
        next(error);
    };
});

voluntaryRoutes.delete("/voluntario", verifyTokenLogin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deleteVoluntary: string | object | undefined = await new DeleteVoluntaryController().deleteVolutary(req)
        if (typeof deleteVoluntary === "string"){
            if (deleteVoluntary === "fill in all the data" || deleteVoluntary === "voluntary not existed"){
                res.status(400).json({message: deleteVoluntary})
                return;
            }

            res.status(200).json({message: deleteVoluntary})
            return;
        }
        res.status(500).json({error: deleteVoluntary})
    } catch (error) {
        next(error);
    };
});

export default voluntaryRoutes;