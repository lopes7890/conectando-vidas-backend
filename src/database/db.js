import mysql from "mysql2";
import "dotenv/config";

const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORTA_DB,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

connection.getConnection((err, res) => {
    if (err){
        console.error("Erro ao conectar ao Banco de dados", err)
        return;
    }

    console.log("conectado ao Banco de dados com o ID: ", res.threadId);
    res.release();
})

export const dataBase = connection.promise();