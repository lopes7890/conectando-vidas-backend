import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";

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

app.listen(port, () => {
    console.log("Servidor rodando na porta: ", port)
})