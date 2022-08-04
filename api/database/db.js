const mysql = require('mysql2');

const config = require('../config/config-db.json');


//se crea un objeto con la información de la base de datos del user
const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  database: config.database,
  password: config.password,
});

module.exports = pool.promise(); //exportamos como una promesa
