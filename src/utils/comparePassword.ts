import { compareSync } from "bcrypt-ts";

export const comparePasswordUser = async (password: string, passwordDb: string): Promise<boolean | null> => {
    try{
        return compareSync(password, passwordDb);
    } catch (error) {
        console.log(error);
        return null;
    };
};