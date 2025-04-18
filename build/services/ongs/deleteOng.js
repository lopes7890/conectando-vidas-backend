import prisma from "../../database/dbConfig.js";
;
class DeleteOngService {
    async serviceDeleteOng(dataOng) {
        try {
            const { id_ong } = dataOng;
            if (!id_ong) {
                return "fill in all the data";
            }
            ;
            const deletedOng = await prisma.oNGs.delete({
                where: { id_ong: id_ong }
            });
            if (deletedOng) {
                return "ONG deleted with success";
            }
            return "ONG not existed";
        }
        catch (error) {
            return { message: error };
        }
        ;
    }
    ;
}
;
export { DeleteOngService };
