import prisma from "../../database/dbConfig.js";
class NewAnimalService {
    async registerAnimalInDataBase(animalData, req) {
        try {
            const { name, description, age, sex, picture, status_adotion, id_ong } = animalData;
            if (!name || !sex || !picture || !id_ong) {
                return "fill in all the data";
            }
            ;
            const verify = await prisma.animais.findFirst({
                where: { nome: name,
                    id_ong: id_ong
                }
            });
            if (verify) {
                return "existing animal";
            }
            await prisma.animais.create({
                data: {
                    nome: name,
                    descricao: description,
                    idade: age,
                    sexo: sex,
                    foto: picture,
                    status_adocao: status_adotion,
                    id_ong: id_ong
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
