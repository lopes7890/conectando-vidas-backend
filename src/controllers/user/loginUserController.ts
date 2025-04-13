import { Request } from "express";


// import class
import { ServiceLoginUser } from "../../services/user/loginUser.js";

interface LoginUser {
    email: string,
    password: string
};

class LoginUserController{
    async controllerLogin(req: Request): Promise<string | object> {
        try{
            const { email, password } =  req.body as LoginUser;

            if(!email || !password){
                return "provide email and password";
            };

            const loginService = new ServiceLoginUser();

            const userLogin = await loginService.serviceLogin(email, password);

            return userLogin;
            

        } catch (error) {
            console.log(error);
            return {message: error};
        };
    };

};

export {LoginUserController};