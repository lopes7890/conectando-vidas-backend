import { Request, Response } from "express";

class DataUser {
    async user(req: Request, res: Response) {
        res.status(200).json(req.user);
        return;
    };
};

export {DataUser};