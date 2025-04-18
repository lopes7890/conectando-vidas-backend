import prisma from "../../database/dbConfig.js";
;
class DeleteStoriesService {
    async deleteServiceStorie(id) {
        try {
            const { id_stories } = id;
            if (!id_stories) {
                return "fill in all the data";
            }
            ;
            await prisma.historias_de_Sucesso.delete({
                where: { id_historia: id_stories }
            });
            return "deleted storie with success";
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
