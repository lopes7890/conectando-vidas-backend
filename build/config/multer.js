//import { randomBytes } from "crypto";
import multer from "multer";
//import { resolve, extname } from "path";
//import { fileURLToPath } from "url";
//import { dirname, resolve, extname } from "path";
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
export const multerConfig = multer({
    storage: multer.memoryStorage()
});
/* export const multerConfig = {
    dest: resolve(__dirname, "..", "..", "uploads"),
    storage: diskStorage({
        destination: (req, file, callback) => {
            callback(null, resolve(__dirname, "..", "..", "uploads"));
        },
        filename: (req, file, callback) => {
            randomBytes(16, (error, hash) => {
                if (error) {
                    return callback(error, file.filename);
                }

                const ext = extname(file.originalname);
                const fileName = `${hash.toString("hex")}${ext}`;
                callback(null, fileName);
            });
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: (req, file, callback) => {
        const formats = ["image/jpeg", "image/jpg", "image/png"];

        if (formats.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error("format not accepted"));
        }
    }
} as Options; */
