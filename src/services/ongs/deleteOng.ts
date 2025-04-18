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
    
            const deletedOng = await prisma.oNGs.delete({
                where: {id_ong: id_ong}
            });
            if(deletedOng){
                return "ONG deleted with success";
            }

            return "ONG not existed";
            
        } catch (error){
            return {message: error};
        };
    };
};

export {DeleteOngService};