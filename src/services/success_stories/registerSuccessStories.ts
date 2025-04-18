import prisma from "../../database/dbConfig.js";

interface SuccessStories {
    id_animal: number,
    title: string,
    description: string,
    picture?: string
}


class NewStoriesService {
    async registerStoriesInDataBase(stories: SuccessStories) {
        try{

            const { id_animal, title, description, picture } = stories as SuccessStories

            if (!id_animal || !title || !description) {
                return "fill in all the data";
            };

            const date = new Date();

            await prisma.historias_de_Sucesso.create({
                data: {
                    id_animal: id_animal,
                    titulo: title,
                    descricao: description,
                    foto: picture,
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