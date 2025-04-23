import { Request } from "express";
import prisma from "../../database/dbConfig.js";

interface SuccessStories {
    id_animal: number,
    title: string,
    description: string,
}

class NewStoriesService {
    async registerStoriesInDataBase(stories: SuccessStories, req: Request) {
        try{

            const { id_animal, title, description } = stories as SuccessStories;

            const image = req.file?.filename;

            if (!id_animal || !title || !description || typeof image === "undefined") {
                return "fill in all the data";
            };

            const date = new Date();


            await prisma.historias_de_Sucesso.create({
                data: {
                    id_animal: id_animal,
                    titulo: title,
                    descricao: description,
                    foto: image,
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