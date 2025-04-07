import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";

// import Class
import { CreateUserController } from "./controllers/newUserController.js";

const app = express()
const port = process.env.PORT;

app.use(cors())
app.use(express.json())

app.get("/teste", async (req: Request, res: Response) => {
    try{
        res.send("Olá mundo!")
    } catch (error) {
        res.send(error)
    }
})

app.post("/cadastro", async (req: Request, res:Response) => {
    try{
        const newUser = await new CreateUserController().newUser(req)
        if (typeof newUser === "string") {
            switch (newUser) {
                case "existing user":
                    res.status(409).send({ message: "Usuário já cadastrado" }); 
                    return;
                case "internal fail, try again":
                case "registered failed":
                    res.status(500).send({ message: newUser }); 
                    return;
                case "registered successfully":
                    res.status(201).send({ message: newUser }); 
                    return;
            }
        }
        res.send(newUser);
        return;
    } catch (error) {
        console.log(error)
        res.send(error)
        return;
    }
})

app.listen(port, () => {
    console.log("Servidor rodando na porta: ", port)
})