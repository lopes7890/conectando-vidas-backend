import { Router } from "express";
import multer from "multer";
import { verifyTokenLogin } from "../middlewares/verifyToken.js";
import { multerConfig } from "../config/multer.js";
// import class
import { NewAnimalController } from "../controllers/animals/newAnimalController.js";
import { DataAnimalController } from "../controllers/animals/dataAnimalController.js";
import { AllDataAnimalController } from "../controllers/animals/allDataAnimalsController.js";
import { DeleteAnimal } from "../controllers/animals/deleteAnimalController.js";
const animalsRoutes = Router();
animalsRoutes.post("/cadastro/animais", multer(multerConfig).single("file"), verifyTokenLogin, async (req, res, next) => {
    try {
        const newAnimalToAdotion = await new NewAnimalController().newAnimal(req);
        if (typeof newAnimalToAdotion === "string") {
            if (newAnimalToAdotion === "animal registered successfully") {
                res.status(200).json({ message: newAnimalToAdotion });
                return;
            }
            ;
            if (newAnimalToAdotion === "internal fail, try again") {
                res.status(500).json({ message: newAnimalToAdotion });
                return;
            }
            ;
            if (newAnimalToAdotion === "fill in all the data" || newAnimalToAdotion === "existing animal") {
                res.status(400).json({ message: newAnimalToAdotion });
                return;
            }
            ;
        }
        ;
        res.status(500).json({ error: newAnimalToAdotion });
        return;
    }
    catch (error) {
        next(error);
    }
    ;
});
animalsRoutes.get("/animal/:id", verifyTokenLogin, async (req, res, next) => {
    try {
        const idAnimal = req.params.id;
        const dataAnimal = await new DataAnimalController().getAnimal(Number(idAnimal));
        if (typeof dataAnimal === "string") {
            if (dataAnimal === "fill in all the data" || dataAnimal === "animal not existed") {
                res.status(400).json({ message: dataAnimal });
                return;
            }
            ;
        }
        ;
        if (typeof dataAnimal === "object") {
            res.status(200).json(dataAnimal);
            return;
        }
        res.status(500).json({ error: dataAnimal });
        return;
    }
    catch (error) {
        next(error);
    }
    ;
});
animalsRoutes.get("/animals", async (req, res, next) => {
    try {
        const dataAnimals = await new AllDataAnimalController().getAllAnimals();
        if (typeof dataAnimals === "string") {
            res.status(500).json({ message: dataAnimals });
            return;
        }
        ;
        if (typeof dataAnimals === "object") {
            res.status(200).json(dataAnimals);
            return;
        }
        res.status(500).json({ error: dataAnimals });
        return;
    }
    catch (error) {
        next(error);
    }
    ;
});
animalsRoutes.delete("/animal", verifyTokenLogin, async (req, res, next) => {
    try {
        const deleteAnimal = await new DeleteAnimal().removeAnimal(req);
        if (typeof deleteAnimal === "string") {
            if (deleteAnimal === "fill in all the data" || deleteAnimal === "animal not existed") {
                res.status(400).json({ message: deleteAnimal });
                return;
            }
            ;
            res.status(200).json({ message: deleteAnimal });
            return;
        }
        res.status(500).json({ error: deleteAnimal });
        return;
    }
    catch (error) {
        next(error);
    }
    ;
});
export default animalsRoutes;
