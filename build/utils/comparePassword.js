import { compareSync } from "bcrypt-ts";
export const comparePasswordUser = async (password, passwordDb) => {
    try {
        return compareSync(password, passwordDb);
    }
    catch (error) {
        console.log(error);
        return null;
    }
    ;
};
