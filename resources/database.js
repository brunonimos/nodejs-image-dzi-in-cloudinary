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
var databaseobj=new database();
module.exports=databaseobj.getConnection();