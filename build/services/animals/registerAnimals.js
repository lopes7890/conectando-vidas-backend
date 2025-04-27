import prisma from "../../database/dbConfig.js";
import cloudinary from "../../config/cloudinary.js";
import streamifier from "streamifier";
class NewAnimalService {
    async registerAnimalInDataBase(animalData, req) {
        try {
            const { name, description, age, sex, status_adotion, id_ong } = animalData;
            const image = req.file;
            if (!name || !sex || !id_ong || typeof image === "undefined") {
                return "fill in all the data";
            }
            ;
            const numberAge = Number(age);
            const numberIdOng = Number(id_ong);
            const verify = await prisma.animais.findFirst({
                where: { nome: name,
                    id_ong: numberIdOng
                }
            });
            if (verify) {
                return "existing animal";
            }
            ;
            const uploadedImage = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({ folder: "animais" }, (error, result) => {
                    if (error || !result) {
                        reject(error);
                    }
                    else {
                        resolve({ url: result.secure_url });
                    }
                });
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
                    id_ong: numberIdOng
                }
            });
            return "animal registered successfully";
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
export { NewAnimalService };
