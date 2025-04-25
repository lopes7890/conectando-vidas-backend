import prisma from "../../database/dbConfig.js";
;
class UpdateAnimalService {
    async updateDataAninalInDataBase(dataAnimal) {
        try {
            const { id_animal } = dataAnimal;
            if (!id_animal) {
                return "fill in all the data";
            }
            ;
            const update = await prisma.animais.update({
                where: {
                    id_animal: id_animal
                },
                data: {
                    status_adocao: "adotado"
                }
            });
            if (update) {
                return "updated with successfuly";
            }
            ;
            return "updated fail";
        }
        catch (error) {
            return { message: error };
        }
        ;
    }
    ;
}
;
export { UpdateAnimalService };
