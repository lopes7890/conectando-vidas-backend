import prisma from "../../database/dbConfig.js";

interface Ong {
    name: string,
    description?: string,
    phone?: string,
    street?: string,
    number?: string,
    postalCode?: string,
    city?: string,
    state?: string,
};


class NewOngService {
    async registerOngInDataBase(dataOng: Ong) {
        try{

            const { name, description, phone, street, number, postalCode, city, state } = dataOng as Ong;

            if(!name){
                return "fill in all the data";
            };

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

        } catch (error){
            return {message: error};
        };
    };
};

export {NewOngService};