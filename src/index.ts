import express, {NextFunction, Request, Response} from "express";
import "express-async-errors";
import { verifyTokenLogin } from "./middlewares/verifyToken.js";
import { errorMiddleware } from "./middlewares/errors.js";
import cors from "cors";
import "dotenv/config";

// import Class
import { CreateUserController } from "./controllers/newUserController.js";
import { LoginUserController } from "./controllers/loginUserController.js";
import { DataUser } from "./controllers/dataUserControllers.js";

const app = express()
const port = process.env.PORT;

app.use(cors())
app.use(express.json())

app.post("/cadastro", async (req: Request, res:Response, next: NextFunction) => {
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
        res.status(500).send({error: newUser});
        return;
    } catch (error) {
        next(error);
    };
});

app.post("/login", async (req: Request, res: Response, next: NextFunction) => {
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

        res.status(500).send({error: userLogin});
        return;

    } catch (error) {
        next(error);
    };
});

app.get("/usuario", verifyTokenLogin, async (req: Request, res: Response, next: NextFunction) => {
    try{

        const userData = await new DataUser().user(req, res);
        res.send(userData);
        return;

    } catch (error) {
        next(error);
    }
});

app.use(errorMiddleware)

app.listen(port, () => {
    console.log("Servidor rodando na porta: ", port);
})