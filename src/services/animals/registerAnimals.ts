import { Animais_sexo, Animais_status_adocao } from "@prisma/client";
import prisma from "../../database/dbConfig.js";
import { Request } from "express";
import cloudinary from "../../config/cloudinary.js";
import streamifier from "streamifier";

interface Animal {
    name: string,
    description?: string,
    age?: number,
    sex: Animais_sexo,
    status_adotion?: Animais_status_adocao,
    name_ong: string
}

class NewAnimalService {
    async registerAnimalInDataBase(animalData: Animal, req: Request){
        try{
            const { name, description, age, sex, status_adotion, name_ong } = animalData as Animal;

            const image = req.file;

            const verifyOng = await prisma.oNGs.findFirst({
                where: {nome: name_ong}
            })

            if (!name || !sex || !verifyOng || typeof image === "undefined"){
                return "fill in all the data";
            };
            const numberAge = Number(age)
            //const numberIdOng = Number(id_ong)

            const verify = await prisma.animais.findFirst({
                where: {nome: name,
                    id_ong: verifyOng.id_ong
                }
            });

            if (verify){
                return "existing animal";
            };

            const uploadedImage = await new Promise<{ url: string }>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "animais" }, 
                    (error, result) => {
                        if (error || !result) {
                            reject(error);
                        } else {
                            resolve({ url: result.secure_url });
                        }
                    }
                );

                streamifier.createReadStream(image.buffer).pipe(uploadStream);
            });

            await prisma.animais.create({
                data: {
                    nome: name,
                    descricao: description,
                    idade: numberAge,
                    sexo: sex,
                    foto: uploadedImage.url,
                    status_adocao: status_adotion,
                    id_ong: verifyOng.id_ong
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