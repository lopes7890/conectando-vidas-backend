import { Router } from "express";
import { verifyTokenLogin } from "../middlewares/verifyToken.js";
import multer from "multer";
import { multerConfig } from "../config/multer.js";
// import class
import { NewSuccessStoriesController } from "../controllers/success_stories/newSuccessStoriesController.js";
import { DeleteSuccessStoriesController } from "../controllers/success_stories/deleteSuccessStoriesController.js";
import { DataSuccessStoriesController } from "../controllers/success_stories/dataSuccessStoriesController.js";
const storiesRoutes = Router();
storiesRoutes.post("/cadastro/historias_de_sucesso", multer(multerConfig).single("file"), verifyTokenLogin, async (req, res, next) => {
    try {
        const stories = await new NewSuccessStoriesController().newStories(req);
        if (typeof stories === "string") {
            if (stories === "internal fail, try again") {
                res.status(500).json({ message: stories });
                return;
            }
            ;
            if (stories === "fill in all the data") {
                res.status(400).json({ message: stories });
                return;
            }
            ;
            if (stories === "storie registered successfuly") {
                res.status(200).json({ message: stories });
                return;
            }
            ;
        }
        ;
        res.status(500).json({ error: stories });
        return;
    }
    catch (error) {
        next(error);
    }
    ;
});
storiesRoutes.get("/historias_de_sucesso", verifyTokenLogin, async (req, res, next) => {
    try {
        const dataStories = await new DataSuccessStoriesController().successStories(req);
        if (typeof dataStories === "string") {
            if (dataStories === "fill in all the data" || dataStories === "storie not existed") {
                res.status(400).json({ message: dataStories });
                return;
            }
            ;
        }
        ;
        if (typeof dataStories === "object") {
            res.status(200).json(dataStories);
            return;
        }
        ;
        res.status(500).json({ error: dataStories });
        return;
    }
    catch (error) {
        next(error);
    }
    ;
});
storiesRoutes.delete("/historias_de_sucesso", verifyTokenLogin, async (req, res, next) => {
    try {
        const deleteStorie = await new DeleteSuccessStoriesController().deleteStories(req);
        if (typeof deleteStorie === "string") {
            if (deleteStorie === "fill in all the data" || deleteStorie === "storie not existed") {
                res.status(400).json({ message: deleteStorie });
                return;
            }
            ;
            res.status(200).json({ message: deleteStorie });
            return;
        }
        ;
        res.status(500).json({ error: deleteStorie });
        return;
    }
    catch (error) {
        next(error);
    }
    ;
});
export default storiesRoutes;
