import express, {ErrorRequestHandler} from "express";
import "express-async-errors";
import { errorMiddleware } from "./middlewares/errors.js";
import cors from "cors";
import "dotenv/config";
import routerUser from "./routes/userRoutes.js";

const app = express()
const port = process.env.PORT;

app.use(cors())
app.use(express.json())

app.use(routerUser);

app.use(errorMiddleware as ErrorRequestHandler)

app.listen(port, () => {
    console.log("Servidor rodando na porta: ", port);
})