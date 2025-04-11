import { Animais_sexo, Animais_status_adocao } from "@prisma/client";
import prisma from "../../database/dbConfig.js";
import { Request } from "express";

interface Animal {
    name: string,
    description?: string,
    age?: number,
    sex: Animais_sexo,
    picture: string,
    status_adotion?: Animais_status_adocao,
    id_ong: number
}

class NewAnimalService {
    async registerAnimalInDataBase(animalData: Animal, req: Request){
        try{
            const { name, description, age, sex, picture, status_adotion, id_ong } = animalData as Animal;

            if (!name || !sex || !picture || !id_ong){
                return "fill in all the data";
            };

            await prisma.animais.create({
                data: {
                    nome: name,
                    descricao: description,
                    idade: age,
                    sexo: sex,
                    foto: picture,
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