import prisma from "../../database/dbConfig.js";
;
class NewOngService {
    async registerOngInDataBase(dataOng) {
        try {
            const { name, description, phone, street, number, postalCode, city, state } = dataOng;
            if (!name) {
                return "fill in all the data";
            }
            ;
            await prisma.oNGs.create({
                data: {
                    nome: name,
                    descricao: description,
                    contato: phone,
                    rua: street,
                    numero: number,
                    cep: postalCode,
                    cidade: city,
                    estado: state
                }
            });
            return "ONG registered successfully";
        }
        catch (error) {
            return { message: error };
        }
        ;
    }
    ;
}
;
export { NewOngService };
