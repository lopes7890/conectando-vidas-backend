import prisma from "../../database/dbConfig.js";
class DataOngService {
    async DataOngInDataBase(dataOng) {
        try {
            const { id_ong } = dataOng;
            if (!id_ong) {
                return "fill in all the data";
            }
            ;
            const DataOnginDB = await prisma.oNGs.findFirst({
                where: { id_ong: id_ong }
            });
            if (DataOnginDB) {
                return DataOnginDB;
            }
            ;
            return "ONG not existed";
        }
        catch (error) {
            return error;
        }
        ;
    }
    ;
}
;
export { DataOngService };
