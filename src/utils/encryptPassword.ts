import {genSaltSync, hashSync} from "bcrypt-ts";

export const encrypt = async (password: string) => {
    try{
        const salt = genSaltSync(10)
        const passwordEncrypted = hashSync(password, salt);

        return passwordEncrypted

    } catch (error) {
        console.log(error)
        return {message: "encrypt fail"}
    }
}