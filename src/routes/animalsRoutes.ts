import { Request, Response, NextFunction, Router } from "express";
import { verifyTokenLogin } from "../middlewares/verifyToken.js";

// import class
import { NewAnimalController } from "../controllers/animals/newAnimalController.js";

const animalsRoutes = Router();


animalsRoutes.post("/cadastro/animais", verifyTokenLogin, async (req: Request, res: Response, next: NextFunction) => {
    try{
            
        const newAnimalToAdotion = await new NewAnimalController().newAnimal(req);
        if(typeof newAnimalToAdotion === "string"){               
            if(newAnimalToAdotion === "animal registered successfully"){                  
                res.status(200).json({message: newAnimalToAdotion});
                return;
            }   
            if(newAnimalToAdotion === "internal fail, try again"){
                res.status(500).json({message: newAnimalToAdotion})
                return;
            }           
            if(newAnimalToAdotion === "fill in all the data"){
                res.status(409).json({message: newAnimalToAdotion})
                return;
            }   
        } 

        res.status(500).json({error: newAnimalToAdotion})

    } catch (error) {
        next(error)
    }
})

export default animalsRoutes;