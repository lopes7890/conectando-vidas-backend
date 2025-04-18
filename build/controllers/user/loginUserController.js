// import class
import { ServiceLoginUser } from "../../services/user/loginUser.js";
;
class LoginUserController {
    async controllerLogin(req) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return "provide email and password";
            }
            ;
            const loginService = new ServiceLoginUser();
            const userLogin = await loginService.serviceLogin(email, password);
            return userLogin;
        }
        catch (error) {
            console.log(error);
            return { message: error };
        }
        ;
    }
    ;
}
;
export { LoginUserController };
