import prisma from "../../database/dbConfig.js";
import { deleteImage } from "../../utils/deleteImages.js";
;
class DeleteStoriesService {
    async deleteServiceStorie(id) {
        try {
            const { id_stories } = id;
            if (!id_stories) {
                return "fill in all the data";
            }
            ;
            const deletedStories = await prisma.historias_de_Sucesso.delete({
                where: { id_historia: id_stories }
            });
            if (deletedStories) {
                if (deletedStories.foto) {
                    deleteImage(deletedStories.foto);
                }
                return "deleted storie with success";
            }
            return "storie not existed";
        }
        catch (error) {
            return { message: error };
        }
        ;
    }
    ;
}
;
export { DeleteStoriesService };
