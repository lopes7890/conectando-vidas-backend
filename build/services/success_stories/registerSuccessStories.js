import prisma from "../../database/dbConfig.js";
class NewStoriesService {
    async registerStoriesInDataBase(stories, req) {
        try {
            const { id_animal, title, description } = stories;
            const image = req.file?.filename;
            if (!id_animal || !title || !description || typeof image === "undefined") {
                return "fill in all the data";
            }
            ;
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
        }
        catch (error) {
            //console.log("service" + error);
            return { message: error };
        }
        ;
    }
    ;
}
;
export { NewStoriesService };
