import prisma from "../../database/dbConfig.js";
import { encrypt } from "../../utils/encryptPassword.js";
;
class RegisterUserService {
    async registerUserInDataBase(userData) {
        try {
            const { name, email, password, phone, street, numberHome, postalCode, city, state, age, type } = userData;
            if (!name || !email || !password ||
                !phone || !street || !numberHome ||
                !postalCode || !city || !state || !age || !type) {
                return "fill in all the data";
            }
            ;
            const verify = await prisma.usuarios.findFirst({
                where: { email: email }
            });
            if (verify !== null) {
                return "existing user";
            }
            ;
            const encrypted = await encrypt(password);
            if (encrypted === null) {
                return "internal fail, try again";
            }
            ;
            await prisma.usuarios.create({
                data: {
                    nome: name,
                    email: email,
                    senha: encrypted,
                    telefone: phone,
                    rua: street,
                    numero: numberHome,
                    cep: postalCode,
                    cidade: city,
                    estado: state,
                    idade: age,
                    tipo: type
                }
            });
            return "registered successfully";
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
export { RegisterUserService };
