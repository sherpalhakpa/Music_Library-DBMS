const mysql = require('mysql');

const connection = mysql.createPool({
  host     : 'leia.cs.spu.edu',
  user     : 'marm',
  password : 'marm25$4410X',
  database : 'marm_db',
  multipleStatements : true,
  connectionLimit : 100
});


module.exports = connection;
