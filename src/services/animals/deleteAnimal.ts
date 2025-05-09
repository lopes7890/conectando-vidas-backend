import prisma from "../../database/dbConfig.js";
import { deleteImage } from "../../utils/deleteImages.js";

interface IdAnimal {
    id_animal: number;
};

class DeleteAnimalService {
    async deleteAnimalInDataBase(id: IdAnimal) {
        try{
            const { id_animal } = id as IdAnimal;

            if(!id_animal){
                return "fill in all the data";
            };
    
            const deletedAnimal = await prisma.animais.delete({
                where: {id_animal: id_animal}
            });

            if (deletedAnimal){
                if (deletedAnimal.foto){
                    const partes = deletedAnimal.foto.split('/upload/')[1]; 
                    const caminhoSemVersao = partes.replace(/^v\d+\//, ''); 
                    const publicId = caminhoSemVersao.replace(/\.(jpg|jpeg|png|webp|gif)$/i, '');
                    deleteImage(publicId);
                };
                return "animal deleted with success";
            };

            return "animal not existed";
    
            
        } catch (error) {
            return {message: error};
        };
    };
};

export {DeleteAnimalService};