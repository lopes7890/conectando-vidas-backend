import { Request } from "express";

// import class
import { NewAnimalService } from "../../services/animals/registerAnimals.js";
import { UnauthorizedError } from "../../helpers/api-errors.js";


class NewAnimalController {
    async newAnimal(req: Request) {
        try{
            const typeUser = req.user;
            if(typeUser.tipo === "admin" || typeUser.tipo === "doador"){
                const newService =  new NewAnimalService();
                const registerNewAnimal = await newService.registerAnimalInDataBase(req.body, req);
                if(typeof registerNewAnimal === "object"){
                    return "internal fail, try again";
                };
    
                return registerNewAnimal;
            };

            throw new UnauthorizedError("not authorized");

        } catch (error) {
            return {message: error};
        };
    };
};

export {NewAnimalController};