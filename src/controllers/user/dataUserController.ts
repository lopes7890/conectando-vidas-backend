import { Request, Response } from "express";

class DataUserController {
    async user(req: Request, res: Response) {
        return req.user;
    };
};

export {DataUserController};