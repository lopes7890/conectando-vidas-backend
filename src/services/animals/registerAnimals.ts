import { Animais_sexo, Animais_status_adocao } from "@prisma/client";
import prisma from "../../database/dbConfig.js";
import { Request } from "express";

interface Animal {
    name: string,
    description?: string,
    age?: number,
    sex: Animais_sexo,
    status_adotion?: Animais_status_adocao,
    id_ong: number
}

class NewAnimalService {
    async registerAnimalInDataBase(animalData: Animal, req: Request){
        try{
            const { name, description, age, sex, status_adotion, id_ong } = animalData as Animal;

            const image = req.file?.filename;

            if (!name || !sex || !id_ong || typeof image === "undefined"){
                return "fill in all the data";
            };

            const verify = await prisma.animais.findFirst({
                where: {nome: name,
                        id_ong: id_ong
                }
            });

            if (verify){
                return "existing animal";
            };

            await prisma.animais.create({
                data: {
                    nome: name,
                    descricao: description,
                    idade: age,
                    sexo: sex,
                    foto: image,
                    status_adocao: status_adotion,
                    id_ong: id_ong
                }
            });

            return "animal registered successfully";

        } catch (error) {
            console.log(error)
            return {message: error};
        };
    };
};

export {NewAnimalService};