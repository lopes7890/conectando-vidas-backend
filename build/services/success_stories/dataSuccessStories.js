import prisma from "../../database/dbConfig.js";
;
class DataStoriesService {
    async dataStoriesInDataBase(data) {
        try {
            const { id_animal } = data;
            if (!id_animal) {
                return "fill in all the data";
            }
            ;
            const storiesDataBase = await prisma.historias_de_Sucesso.findFirst({
                where: { id_animal: id_animal }
            });
            if (storiesDataBase) {
                return storiesDataBase;
            }
            ;
            return "storie not existed";
        }
        catch (error) {
            return error;
        }
        ;
    }
    ;
}
;
export { DataStoriesService };
