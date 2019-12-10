const mysql = require('mysql');

const connection = mysql.createPool({
  host     : 'leia.cs.spu.edu',
  user     : 'sherpal',
  password : 'sherpal19$4410X',
  database : 'employees',
  multipleStatements : true,
  connectionLimit : 100  
});


module.exports = connection;
