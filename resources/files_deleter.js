var basecloudelete=(function(){
function basecloudelete(titles,files,adm){
if(typeof files=="object" && files[0].name!==""){
this.files=files;
}
if(typeof titles=="object" && titles.oldtitle!==""){
this.titles=titles;
}
if(adm!==""){
this.adm=adm;
}
this.cloudinary=require('cloudinary');
this.cloudinary.config({ 
cloud_name: process.env.CLOUDINARY_NAME, 
api_key: process.env.CLOUDINARY_KEY, 
api_secret: process.env.CLOUDINARY_SECRET
});
}
function inprivate(callback){
var obj=this;
for(var keys in obj.files){
if(obj.files[keys].name!==""){
obj.cloudinary.api.delete_resources_by_prefix(obj.titles.oldtitle+'/'+obj.files[keys].name,function(result){
console.log(result);
},{invalidate:true});
obj.cloudinary.v2.uploader.destroy(obj.titles.oldtitle+'/'+obj.files[keys].name+'.'+obj.files[keys].extension+'.dzi',{resource_type:'raw',invalidate:true},function(err,result){
if(err){
console.log(err);
}
console.log("Tile Sources deleted? "+result);
});
if(typeof obj.files[keys+1]=="undefined"){
callback(false,"Todos os arquivos foram deletados");
}
}
}
}
basecloudelete.prototype.inpublic=function(callback){
return inprivate.call(this,callback);
};
return basecloudelete;
})();
module.exports=basecloudelete;