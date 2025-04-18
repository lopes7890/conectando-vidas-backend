import prisma from "../../database/dbConfig.js";

interface IdStories {
    id_stories: number;
};

class DeleteStoriesService {
    async deleteServiceStorie(id: IdStories) {
        try{
            const { id_stories } = id as IdStories;
            if (!id_stories) {
                return "fill in all the data";
            };

            const deletedStories = await prisma.historias_de_Sucesso.delete({
                where: {id_historia: id_stories}
            });

            if(deletedStories){
                return "deleted storie with success"; 
            }

            return "storie not existed";
           

        } catch (error) {
            return {message: error};
        };
    };
};

export {DeleteStoriesService};