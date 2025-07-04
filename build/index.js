import express from "express";
import "express-async-errors";
import { errorMiddleware } from "./middlewares/errors.js";
import cors from "cors";
import "dotenv/config";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
// routes
import userRoutes from "./routes/userRoutes.js";
import animalsRoutes from "./routes/animalsRoutes.js";
import ongsRouter from "./routes/ongsRoutes.js";
import storiesRoutes from "./routes/successStoriesRoutes.js";
import voluntaryRoutes from "./routes/voluntaryRoutes.js";
const app = express();
const port = process.env.PORT;
app.use(cors({
    origin: 'https://conectando-vidas-frontend.vercel.app',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
}));
app.use(express.json());
app.use(userRoutes);
app.use(animalsRoutes);
app.use(ongsRouter);
app.use(storiesRoutes);
app.use(voluntaryRoutes);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));
app.use(errorMiddleware);
app.listen(port, () => {
    console.log("Servidor rodando na porta: ", port);
});
