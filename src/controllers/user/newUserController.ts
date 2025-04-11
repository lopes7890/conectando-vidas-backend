import { Request } from "express";
import { RegisterUserService } from "../../services/user/registerUser.js";



class CreateUserController {
    async newUser(req: Request): Promise<string | object> {
        try{
            const registerService = new RegisterUserService();
            
            const register = await registerService.registerUserInDataBase(req.body);

            if (typeof register === "object"){
                return "registered failed"
            };

            return register;

        } catch (error) {
            console.log(error)
            return {message: error}
        };

    };
};


export {CreateUserController};