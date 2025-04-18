import prisma from "../../database/dbConfig.js";
;
class NewVoluntaryService {
    async registerVoluntaryInDataBase(dataVoluntary, dataUser) {
        try {
            const { atuation_area, disponibility, age, experience, experience_description, reason, interest_area, datailed_disponibility } = dataVoluntary;
            if (!atuation_area) {
                return "fill in all the data";
            }
            ;
            const verifyDataBase = await prisma.voluntariado.findFirst({
                where: { id_usuario: dataUser }
            });
            if (verifyDataBase) {
                return "the user is already a volunteer";
            }
            ;
            const date = new Date();
            if (dataUser)
                await prisma.voluntariado.create({
                    data: {
                        id_usuario: dataUser,
                        area_atuacao: atuation_area,
                        disponibilidade: disponibility,
                        data_cadastro: date,
                        idade: age,
                        experiencia: experience,
                        descricao_experiencia: experience_description,
                        motivo: reason,
                        areas_interesse: interest_area,
                        disponibilidade_detalhada: datailed_disponibility
                    }
                });
            return "voluntary registered successfully";
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
export { NewVoluntaryService };
