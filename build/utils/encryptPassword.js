import { genSaltSync, hashSync } from "bcrypt-ts";
export const encrypt = async (password) => {
    try {
        const salt = genSaltSync(10);
        const passwordEncrypted = hashSync(password, salt);
        return passwordEncrypted;
    }
    catch (error) {
        console.log(error);
        return null;
    }
    ;
};
