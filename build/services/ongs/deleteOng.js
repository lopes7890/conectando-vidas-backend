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
            await prisma.oNGs.delete({
                where: { id_ong: id_ong }
            });
            return "ONG deleted with success";
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
