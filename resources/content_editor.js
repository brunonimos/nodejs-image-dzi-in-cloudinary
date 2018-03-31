var baseedit=(function(){
function baseedit(author,titles,media){
this.connection=require("./database");
this.baseuploader=require("./files_uploader");
if(author!==""){
this.author=author;
}
if(typeof titles=="object" && titles.newtitle!==""){
this.titles=titles;
}
if(typeof media=="object" && media[0]!==""){
var typemismatch=true;
for(var key in media){
if(media[key].mimetype=="video/wmv" || media[key].mimetype=="video/avi" || media[key].mimetype=="video/mp4" || media[key].mimetype=="image/jpeg" || media[key].mimetype=="image/png" || media[key].mimetype=="image/jpg"){
typemismatch=false;
}else{
typemismatch=true;
}
}
if(typemismatch===false){
this.media=media;
this.adm="adm";
}
}
}
function inprivate(callback){
var obj=this;
if(typeof obj.media!=="undefined" && typeof obj.author!=="undefined" && typeof obj.titles!=="undefined" && typeof obj.adm!=="undefined"){
obj.connection.connect().then(client=>{
return client.query("INSERT INTO content(titulo,autor) VALUES ($1,$2)",[obj.titles.newtitle,obj.author]).then(function(){
client.release();
var uploader=new obj.baseuploader(obj.author,obj.media,obj.titles,"editor",obj.adm);
uploader.inpublic(function(err,results){
if(results){
callback(false,"Sucesso");
}else{
callback("Erro fazer criar multimidia",false);
}
});
}).catch(e=>{
client.release();
console.log(e.stack);
});
});
}else{
callback('Bad request: While authenticating adm',false);
}
}
baseedit.prototype.inpublic=function(callback){
return inprivate.call(this,callback);
};
return baseedit;
})();
module.exports=baseedit;