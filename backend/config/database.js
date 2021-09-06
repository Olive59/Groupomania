const mysql = require('mysql');
const dotenv = require('dotenv');
// utilisation du module 'dotenv' pour masquer les informations de connexion à la base de données à l'aide de variables d'environnement
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});
connection.connect(function(err) { 
    if (err) throw err;
    console.log('Connecté à mySql')
});
module.exports = connection;
