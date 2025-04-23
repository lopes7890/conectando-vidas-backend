import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const deleteImage = (filename) => {
    const filePath = path.resolve(__dirname, "..", "..", "uploads", filename);
    console.log(filePath);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error("Error deleting image:", err);
        }
        else {
            console.log("Image deleted successfully:", filename);
        }
        ;
    });
};
