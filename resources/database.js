var database=(function(){
function database(){
const { Pool }=require('pg');
this.client=new Pool();
}
function getClient(){
this.client.on('error',(err)=>{
console.error('Unexpected error on idle client: ',err);
process.exit(-1);
});
return this.client;
}
database.prototype.getConnection=function(){
return getClient.call(this);
};
return database;
})();
/*
const db=process.env.ELEPHANT_NAME;
const host=process.env.ELEPHANT_HOST;
const port=process.env.ELEPHANT_PORT;
const user=process.env.ELEPHANT_USER;
const pass=process.env.ELEPHANT_PASS;
const max=10;
const idle=30000;
const dbconfig={host:host,port:port,charset:'utf8mb4',user:user,password:pass,database:db,max:max,idleTimeoutMillis:idle};
const options={
error:function(error,e){
if(e.cn){
console.log("CN:",e.cn);
console.log("EVENT:",error.message || error);
}
}
};
var pg=require('pg-promise')(options);
var connection=pg(dbconfig);
var database=(function(){
function database(){
const { Pool }=require('pg');
this.pg=new Pool();
}
function getPostgre(){
return this.pg;
}
function getConnection(){
console.log(this.connection);
return this.connection;
}
function closeConnection(){
this.pg.end();
}
database.prototype.getPostgre=function(){
return getPostgre.call(this);
};
database.prototype.getConnection=function(){
return getConnection.call(this);
};
database.prototype.closeConnection=function(){
return closeConnection.call(this);
};
return database;
})();
*/
var databaseobj=new database();
module.exports=databaseobj.getConnection();