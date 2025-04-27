import { Request } from "express";
import prisma from "../../database/dbConfig.js";
import cloudinary from "../../config/cloudinary.js";
import streamifier from "streamifier";

interface SuccessStories {
    id_animal: number,
    title: string,
    description: string,
}

class NewStoriesService {
    async registerStoriesInDataBase(stories: SuccessStories, req: Request) {
        try{

            const { id_animal, title, description } = stories as SuccessStories;

            const image = req.file;

            if (!id_animal || !title || !description || typeof image === "undefined") {
                return "fill in all the data";
            };

            const date = new Date();

                        const uploadedImage = await new Promise<{ url: string }>((resolve, reject) => {
                            const uploadStream = cloudinary.uploader.upload_stream(
                                { folder: "stories" }, 
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


            await prisma.historias_de_Sucesso.create({
                data: {
                    id_animal: id_animal,
                    titulo: title,
                    descricao: description,
                    foto: uploadedImage.url,
                    data_publicacao: date
                }
            });

            return "storie registered successfuly";

        } catch (error) {
            //console.log("service" + error);
            return {message: error};

        };
    };
};

export {NewStoriesService};