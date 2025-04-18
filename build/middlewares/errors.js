import { ApiError } from "../helpers/api-errors.js";
export const errorMiddleware = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    console.error("internal error", err);
    return res.status(500).json({ message: "Internal Server Error" });
};
