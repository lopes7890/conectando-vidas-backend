/* import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const deleteImage = (filename: string): void => {
    const filePath = path.resolve(__dirname, "..", "..", "uploads", filename);
    console.log(filePath);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error deleting image:", err);
        } else {
            console.log("Image deleted successfully:", filename);
        };
    });
}; */

import cloudinary from "../config/cloudinary.js";

export const deleteImage = async (publicId: string) => {
  try {
    const resultado = await cloudinary.uploader.destroy(publicId);
    console.log('Imagem deletada:', resultado);
    return resultado;
  } catch (erro) {
    console.error('Erro ao deletar imagem:', erro);
    throw erro;
  }
}