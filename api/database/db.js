const mysql = require('mysql2');

const config = require('../config/config-db.json');
const root = "root";
const password = "";
const database = "ecomerce";

//se crea un objeto con la información de la base de datos del user
const pool = mysql.createPool({
  host: config.host,
  user: root,
  database: database,
  password: password,
});

module.exports = pool.promise(); //exportamos como una promesa
