import prisma from "../../database/dbConfig.js";
;
class NewVoluntaryService {
    async registerVoluntaryInDataBase(dataVoluntary, dataUser) {
        try {
            const { disponibility, age, experience, experience_description, reason, interest_area, datailed_disponibility } = dataVoluntary;
            if (!interest_area || !experience || !experience_description || !reason) {
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
            if (dataUser) {
                const register = await prisma.voluntariado.create({
                    data: {
                        id_usuario: dataUser,
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
                if (register) {
                    await prisma.usuarios.update({
                        where: {
                            id_usuario: dataUser
                        },
                        data: {
                            tipo: "voluntario"
                        }
                    });
                }
                ;
            }
            ;
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
