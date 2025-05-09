import { Request, Response, NextFunction, Router } from "express";
import multer from "multer";
import { verifyTokenLogin } from "../middlewares/verifyToken.js";
import {multerConfig} from "../config/multer.js";

// import class
import { NewAnimalController } from "../controllers/animals/newAnimalController.js";
import { DataAnimalController } from "../controllers/animals/dataAnimalController.js";
import { AllDataAnimalController } from "../controllers/animals/allDataAnimalsController.js";
import { DeleteAnimal } from "../controllers/animals/deleteAnimalController.js";
import { UpdateDataAnimal } from "../controllers/animals/updateDataAnimalController.js";
import { LastAnimalsController } from "../controllers/animals/dataLastAnimalsController.js";

const animalsRoutes: Router = Router();


animalsRoutes.post("/cadastro/animais",  verifyTokenLogin, multerConfig.single("file"), async (req: Request, res: Response, next: NextFunction) => {
    try{
            
        const newAnimalToAdotion: string | object = await new NewAnimalController().newAnimal(req);
        if(typeof newAnimalToAdotion === "string"){      

            if(newAnimalToAdotion === "animal registered successfully"){                  
                res.status(200).json({message: newAnimalToAdotion});
                return;
            }; 

            if(newAnimalToAdotion === "internal fail, try again"){
                res.status(500).json({message: newAnimalToAdotion});
                return;
            }; 

            if(newAnimalToAdotion === "fill in all the data" || newAnimalToAdotion === "existing animal"){
                res.status(400).json({message: newAnimalToAdotion});
                return;
            };   
        }; 

        res.status(500).json({error: newAnimalToAdotion});
        return;

    } catch (error) {
        next(error);
    };
});

animalsRoutes.get("/animal/:id", verifyTokenLogin, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const idAnimal: string = req.params.id;
        const dataAnimal: string | object | unknown = await new DataAnimalController().getAnimal(Number(idAnimal));
        if (typeof dataAnimal === "string"){
            if (dataAnimal === "fill in all the data" || dataAnimal === "animal not existed"){
                res.status(400).json({message: dataAnimal});
                return;
            };
        };
        if (typeof dataAnimal === "object"){
            res.status(200).json(dataAnimal);
            return;
        }

        res.status(500).json({error: dataAnimal});
        return;
    } catch (error) {
        next(error);
    };
});

animalsRoutes.put("/animal/adotado", verifyTokenLogin, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const update: string | object = await new UpdateDataAnimal().animalUpdate(req);
        if (typeof update === "string"){
            if (update === "fill in all the data") {
                res.status(400).json({message: update});
                return;
            };

            if (update === "updated fail") {
                res.status(500).json({message: update});
                return;
            };

            if (update === "updated with successfuly") {
                res.status(200).json({message: update});
                return;
            };
        };

        res.status(500).json({error: update});
        return;
    } catch (error) {
        next(error);
    };
});

animalsRoutes.get("/animals", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const dataAnimals: string | object | unknown = await new AllDataAnimalController().getAllAnimals();

        if (typeof dataAnimals === "string") {
            res.status(500).json({message: dataAnimals});
            return;
        };

        if (typeof dataAnimals === "object"){
            res.status(200).json(dataAnimals);
            return;
        }

        res.status(500).json({error: dataAnimals});
        return;

    } catch (error) {
        next(error);
    };
});

animalsRoutes.get("/ultimos/animais", async (req: Request, res: Response, next: NextFunction) => {
    try{
        const dataLastAnimals: string | object | unknown = await new LastAnimalsController().getLastAnimals();

        if (typeof dataLastAnimals === "string"){
            res.status(500).json({message: dataLastAnimals});
            return;
        };

        if (typeof dataLastAnimals === "object") {
            res.status(200).json(dataLastAnimals);
            return;
        };

        res.status(500).json({error: dataLastAnimals});
        return;
    } catch (error) {
        next(error);
    };
});

animalsRoutes.delete("/animal", verifyTokenLogin, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const deleteAnimal: string | object = await new DeleteAnimal().removeAnimal(req);
        if(typeof deleteAnimal === "string"){
            if(deleteAnimal === "fill in all the data" || deleteAnimal === "animal not existed"){
                res.status(400).json({message: deleteAnimal});
                return;
            };
            res.status(200).json({message: deleteAnimal});
            return;
        }

        res.status(500).json({error: deleteAnimal});
        return;
    } catch (error) {
        next(error);
    };
});

export default animalsRoutes;