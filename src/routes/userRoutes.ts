import { Request, Response, Router, NextFunction } from "express";
import { verifyTokenLogin } from "../middlewares/verifyToken.js";


// import class
import { CreateUserController } from "../controllers/user/newUserController.js";
import { LoginUserController } from "../controllers/user/loginUserController.js";
import { DataUser } from "../controllers/user/dataUserController.js";
import { DeleteUser } from "../controllers/user/deleteUserController.js";


const userRoutes = Router();

userRoutes.post("/cadastro", async (req: Request, res:Response, next: NextFunction) => {
    try{
        const newUserRegister = await new CreateUserController().newUser(req);
        if (typeof newUserRegister === "string") {
            switch (newUserRegister) {
                case "existing user":
                case "fill in all the data":
                    res.status(409).json({ message: newUserRegister }); 
                    return;
                case "internal fail, try again":
                case "registered failed":
                    res.status(500).json({ message: newUserRegister }); 
                    return;
                case "registered successfully":
                    res.status(201).json({ message: newUserRegister }); 
                    return;
            };
        };
        return;
    } catch (error) {
        next(error);
    };
});

userRoutes.post("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userLogin = await new LoginUserController().controllerLogin(req);

        if (typeof userLogin === "string") {
            switch (userLogin){
                case "provide email and password":
                case "user not found":
                case "incorrect password":
                    res.status(409).json({ message: userLogin });
                    return; 
                case "internal fail, try again":
                    res.status(500).json({ message: userLogin });
                    return;
            };

            res.status(200).json(userLogin);
            return;
        };
        return;

    } catch (error) {
        next(error);
    };
});

userRoutes.get("/usuario", verifyTokenLogin, async (req: Request, res: Response, next: NextFunction) => {
    try{

        const userData = await new DataUser().user(req, res);
        res.send(userData);
        return;

    } catch (error) {
        next(error);
    };
});

userRoutes.delete("/usuario", verifyTokenLogin, async (req: Request, res: Response, next: NextFunction) => {
    try{
        const deleteUser = await new DeleteUser().userDelete(req);
        if (typeof deleteUser === "string"){
            res.status(200).json({message: deleteUser});
        };
    } catch (error) {
        next(error)
    };
});

export default userRoutes;