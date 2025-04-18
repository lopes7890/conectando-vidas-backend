import prisma from "../../database/dbConfig.js";
;
class NewVoluntaryService {
    async registerVoluntaryInDataBase(dataVoluntary) {
        try {
            const { id_user, atuation_area, disponibility, age, experience, experience_description, reason, interest_area, datailed_disponibility } = dataVoluntary;
            if (!id_user || !atuation_area) {
                return "fill in all the data";
            }
            ;
            const date = new Date();
            await prisma.voluntariado.create({
                data: {
                    id_usuario: id_user,
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
            return { message: error };
        }
        ;
    }
    ;
}
;
export { NewVoluntaryService };
