var mysql=require('mysql');
var connection=mysql.createConnection({
  host:'leia.cs.spu.edu',
  user:'sherpal',
  password:'sherpal19$4410X',
  database:'employees'
});
connection.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!:)');
  }
});
module.exports = connection;
