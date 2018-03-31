var basetruncate=(function(){
function basetruncate(titles){
this.connection=require("./database");
this.filesdeleter=require("./files_deleter");
if(typeof titles=="object" && titles.oldtitle!==""){
this.titles=titles;
}
this.adm="adm";
}
function inprivate(callback){
var obj=this;
if(typeof obj.titles!=="undefined" && typeof obj.titles.oldtitle!=="undefined" && typeof obj.adm!=="undefined"){
obj.connection.connect().then(client=>{
return client.query("SELECT * FROM content WHERE titulo = $1",[obj.titles.oldtitle]).then(contentres=>{
client.release();
if(typeof contentres.rows[0]!=="undefined" && contentres.rows[0].titulo!==""){
content_deleter(obj,callback);
}else{
callback('Conteúdo não encontrado na base de dados, contate o administrador.',false);
}
}).catch(e=>{
client.release();
callback("Erro ao consultar conteúdo, COND112",false);
console.log(e.stack);
});
});
}else{
callback('Bad Request: Unsetted delete params.',false);
}
}
function content_deleter(obj,callback){
obj.connection.connect().then(client=>{
return client.query("SELECT * FROM multimidia WHERE titulo=$1",[obj.titles.oldtitle]).then(multimidiares=>{
if(typeof multimidiares.rows[0]!=="undefined" && multimidiares.rows[0].titulo!=="" && multimidiares.rows[0].name!==""){
obj.media=multimidiares.rows;
var mediadelobj=new obj.filesdeleter(obj.titles,obj.media,obj.adm);
mediadelobj.inpublic(function(err,results){
if(results){
return client.query("DELETE FROM multimidia WHERE titulo=$1",[obj.titles.oldtitle]).then(function(){
return client.query("DELETE FROM content WHERE titulo=$1",[obj.titles.oldtitle]).then(function(){
client.release();
callback(false,'Excluindo o conteúdo '+obj.titles.oldtitle);
}).catch(e=>{
client.release();
callback("Erro ao deletar conteúdo, COND112",false);
console.log(e.stack);
});
}).catch(e=>{
client.release();
callback("Erro ao deletar multimidia, COND114",false);
console.log(e.stack);
});
}else{
callback("Erro ao deletar conteúdo, COND113",false);
}
});
}
}).catch(e=>{
client.release();
callback("Erro ao deletar multimidia, COND111",false);
console.log(e.stack);
});
});
}
basetruncate.prototype.inpublic=function(callback){
return inprivate.call(this,callback);
};
return basetruncate;
})();
module.exports=basetruncate;