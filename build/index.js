import express from "express";
import "express-async-errors";
import { errorMiddleware } from "./middlewares/errors.js";
import cors from "cors";
import "dotenv/config";
// routes
import userRoutes from "./routes/userRoutes.js";
import animalsRoutes from "./routes/animalsRoutes.js";
import ongsRouter from "./routes/ongsRoutes.js";
import storiesRoutes from "./routes/successStoriesRoutes.js";
import voluntaryRoutes from "./routes/voluntaryRoutes.js";
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(animalsRoutes);
app.use(ongsRouter);
app.use(storiesRoutes);
app.use(voluntaryRoutes);
app.use(errorMiddleware);
app.listen(port, () => {
    console.log("Servidor rodando na porta: ", port);
});
