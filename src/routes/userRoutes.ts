import { Request, Response, Router, NextFunction } from "express";
import { verifyTokenLogin } from "../middlewares/verifyToken.js";

import { CreateUserController } from "../controllers/user/newUserController.js";
import { LoginUserController } from "../controllers/user/loginUserController.js";
import { DataUser } from "../controllers/user/dataUserController.js";
import { DeleteUser } from "../controllers/user/deleteUserController.js";


const routerUser = Router();

routerUser.post("/cadastro", async (req: Request, res:Response, next: NextFunction) => {
    try{
        const newUser = await new CreateUserController().newUser(req)
        if (typeof newUser === "string") {
            switch (newUser) {
                case "existing user":
                case "fill in all the data":
                    res.status(409).send({ message: newUser }); 
                    return;
                case "internal fail, try again":
                case "registered failed":
                    res.status(500).send({ message: newUser }); 
                    return;
                case "registered successfully":
                    res.status(201).send({ message: newUser }); 
                    return;
            };
        };
        return;
    } catch (error) {
        next(error);
    };
});

routerUser.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userLogin = await new LoginUserController().controllerLogin(req);

        if (typeof userLogin === "string") {
            switch (userLogin){
                case "provide email and password":
                case "user not found":
                case "incorrect password":
                    res.status(409).send({ message: userLogin });
                    return; 
                case "internal fail, try again":
                    res.status(500).send({ message: userLogin });
                    return;
            };

            res.status(200).send(userLogin);
            return;
        };
        return;

    } catch (error) {
        next(error);
    };
});

routerUser.get("/usuario", verifyTokenLogin, async (req: Request, res: Response, next: NextFunction) => {
    try{

        const userData = await new DataUser().user(req, res);
        res.send(userData);
        return;

    } catch (error) {
        next(error);
    };
});

routerUser.delete("/usuario", verifyTokenLogin, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const deleteUser = await new DeleteUser().userDelete(req);
        if (typeof deleteUser === "string"){
            res.status(200).send({message: deleteUser});
        };
    } catch (error) {
        next(error)
    };
});

export default routerUser;