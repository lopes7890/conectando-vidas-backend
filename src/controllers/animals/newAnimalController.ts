import { Request } from "express";

// import class
import { NewAnimalService } from "../../services/animals/registerAnimals.js";

class NewAnimalController {
    async newAnimal(req: Request) {
        try{
            const newService = new NewAnimalService();
            const registerNewAnimal = await newService.registerAnimalInDataBase(req.body, req);

            if (typeof registerNewAnimal === "object"){
                return "internal fail, try again"
            };
    
            return registerNewAnimal;

        } catch (error) {
            return {message: error};
        };
    };
};

export {NewAnimalController};