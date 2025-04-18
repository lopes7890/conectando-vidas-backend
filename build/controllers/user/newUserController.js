// import class
import { RegisterUserService } from "../../services/user/registerUser.js";
class CreateUserController {
    async newUser(req) {
        try {
            const registerService = new RegisterUserService();
            const registerNewUser = await registerService.registerUserInDataBase(req.body);
            if (typeof registerNewUser === "object") {
                return "registered failed";
            }
            ;
            return registerNewUser;
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
export { CreateUserController };
