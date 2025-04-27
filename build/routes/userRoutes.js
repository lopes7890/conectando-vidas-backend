import { Router } from "express";
import { verifyTokenLogin } from "../middlewares/verifyToken.js";
// import class
import { CreateUserController } from "../controllers/user/newUserController.js";
import { LoginUserController } from "../controllers/user/loginUserController.js";
import { DataUserController } from "../controllers/user/dataUserController.js";
import { DeleteUserController } from "../controllers/user/deleteUserController.js";
import { UpdateDataUserController } from "../controllers/user/updateUserController.js";
const userRoutes = Router();
userRoutes.post("/cadastro/usuario", async (req, res, next) => {
    try {
        const newUserRegister = await new CreateUserController().newUser(req);
        if (typeof newUserRegister === "string") {
            switch (newUserRegister) {
                case "existing user":
                case "fill in all the data":
                    res.status(400).json({ message: newUserRegister });
                    return;
                case "internal fail, try again":
                case "registered failed":
                    res.status(500).json({ message: newUserRegister });
                    return;
                case "registered successfully":
                    res.status(201).json({ message: newUserRegister });
                    return;
            }
            ;
        }
        ;
        res.status(500).json({ error: newUserRegister });
        return;
    }
    catch (error) {
        next(error);
    }
    ;
});
userRoutes.post("/login", async (req, res, next) => {
    try {
        const userLogin = await new LoginUserController().controllerLogin(req);
        if (typeof userLogin === "string") {
            switch (userLogin) {
                case "provide email and password":
                case "user not found":
                case "incorrect password":
                    res.status(400).json({ message: userLogin });
                    return;
                case "internal fail, try again":
                    res.status(500).json({ message: userLogin });
                    return;
            }
            ;
            res.status(200).json(userLogin);
            return;
        }
        ;
        res.status(500).json({ error: userLogin });
        return;
    }
    catch (error) {
        next(error);
    }
    ;
});
userRoutes.get("/usuario", verifyTokenLogin, async (req, res, next) => {
    try {
        const userData = await new DataUserController().user(req, res);
        res.send(userData);
        return;
    }
    catch (error) {
        next(error);
    }
    ;
});
userRoutes.put("/atualizar/usuario", verifyTokenLogin, async (req, res, next) => {
    try {
        const updateUser = await new UpdateDataUserController().updateDataUser(req);
        if (typeof updateUser === "string") {
            if (updateUser === "updated with successfuly") {
                res.status(200).json({ message: updateUser });
                return;
            }
            if (updateUser === "fill in at least one field") {
                res.status(400).json({ message: updateUser });
                return;
            }
            res.status(500).json({ message: updateUser });
            return;
        }
        if (typeof updateUser === "object" || typeof updateUser === "undefined") {
            res.status(500).json({ error: updateUser });
            return;
        }
    }
    catch (error) {
        next(error);
    }
    ;
});
userRoutes.delete("/usuario", verifyTokenLogin, async (req, res, next) => {
    try {
        const deleteUser = await new DeleteUserController().userDelete(req);
        if (typeof deleteUser === "string") {
            if (deleteUser === "user not existed") {
                res.status(400).json({ message: deleteUser });
                return;
            }
            res.status(200).json({ message: deleteUser });
            return;
        }
        ;
        res.status(500).json({ error: deleteUser });
        return;
    }
    catch (error) {
        next(error);
    }
    ;
});
export default userRoutes;
