import prisma from "../../database/dbConfig.js";

interface Ong {
    id_ong: number
};

class DeleteOngService {
    async serviceDeleteOng(dataOng: Ong){
        try{
            const { id_ong } = dataOng as Ong;
            if(!id_ong){
                return "fill in all the data";
            };
    
            await prisma.oNGs.delete({
                where: {id_ong: id_ong}
            });
    
            return "deleted with success";
        } catch (error){
            return {message: error};
        };
    };
};

export {DeleteOngService};