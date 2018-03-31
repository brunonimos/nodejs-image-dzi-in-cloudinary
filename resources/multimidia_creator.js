var basemediacreator=(function(){
function basemediacreator(author,title,media,adm){
this.connection=require('./database');
if(author!==""){
this.author=author;
}
if(title!==""){
this.title=title;
}
if(typeof media=="object" && media.name!==""){
this.media=media;
}
if(adm!==""){
this.adm=adm;
}
}
function inprivate(callback){
var obj=this;
if(typeof obj.author!=="undefined" && typeof obj.adm!=="undefined" && obj.title!=="" && obj.media.name!=="" && obj.media.url!=="" && obj.media.type!=="" && obj.media.subject!==""){
if(obj.media.subject=="image"){
obj.connection.connect().then(client=>{
return client.query("SELECT * FROM multimidia WHERE titulo = $1 AND name = $2",[obj.title,obj.media.name]).then(multimidiares=>{
client.release();
if(typeof multimidiares.rows[0]!=="undefined" && multimidiares.rows[0].titulo!=="" || typeof multimidiares.rows[0]!=="undefined" && multimidiares.rows[0].login!==""){
callback('Multimidia existente, altere o nome para fazer upload.',false);
}else{
multimidia_creator(obj,callback);
}
}).catch(e=>{
client.release();
callback("Erro ao consultar multimidia, MUTC111",false);
console.log(e.stack);
});
});
}
}else{
callback('Bad request: Unsetted multimidia params',false);
}
}
function multimidia_creator(obj,callback){
if(obj.media.subject=="image"){
obj.connection.connect().then(client=>{
return client.query("INSERT INTO multimidia(titulo,name,link,extension,autor,subject,creator) VALUES($1,$2,$3,$4,$5,$6,$7)",[obj.title,obj.media.name,obj.media.url,obj.media.type,obj.author,obj.media.subject,obj.adm]).then(function(){
client.release();
callback(false,obj.media.name+' registrado');
}).catch(e=>{
client.release();
callback("Erro ao inserir multimidia, MUTC112",false);
console.log(e.stack);
});
});
}
}
basemediacreator.prototype.inpublic=function(callback){
return inprivate.call(this,callback);
};
return basemediacreator;
})();
module.exports=basemediacreator;