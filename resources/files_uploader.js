var basecloudupload=(function(){
function basecloudupload(author,files,titles,method,adm){
if(typeof files!=="undefined"){
this.files=files;
}
if(typeof titles!=="undefined" && titles.newtitle!==""){
this.title=titles.newtitle;
if(titles.oldtitle!==""){
this.oldtitle=titles.oldtitle;
}
this.directories=[];
this.directories.push('./public/storage/content/images/'+titles.newtitle,'./public/storage/content/videos/'+titles.newtitle);
this.directorytemp=this.directories[0];
}
if(author!==""){
this.author=author;
}
if(method!==""){
this.method=method;
if(this.method=="editor"){
this.subject="image";
}
}
if(adm!==""){
this.adm=adm;
}
this.basemultimidia=require('./multimidia_creator');
this.rmdir=require('rmdir');
this.fsextra=require('fs-extra');
this.fs=require('fs');
this.path=require('path');
this.sharp=require('sharp');
this.cloudinary=require('cloudinary');
this.cloudinary.config({ 
cloud_name: process.env.CLOUDINARY_NAME, 
api_key: process.env.CLOUDINARY_KEY, 
api_secret: process.env.CLOUDINARY_SECRET
});
}
function inprivate(callback){
var obj=this;
var category="image";
if(typeof obj.method!=="undefined" && typeof obj.subject!=="undefined" && obj.method=="creator" || typeof obj.method!=="undefined" && typeof obj.subject!=="undefined" && obj.method=="editor" || typeof obj.method!=="undefined" && typeof obj.subject!=="undefined" && obj.method=="user"){
for(var keys in obj.files){
if(typeof obj.files!=="undefined"){
if(obj.path.extname(obj.files[keys].originalname).toLowerCase()==".png" || obj.path.extname(obj.files[keys].originalname).toLowerCase()==".jpg" || obj.path.extname(obj.files[keys].originalname).toLowerCase()==".jpeg"){
obj.directorytemp=obj.directories[0];
}
if(!obj.fs.existsSync(obj.directorytemp)){
obj.fs.mkdirSync(obj.directorytemp);
console.log("Created: "+obj.directorytemp);
}else{
console.log(obj.directorytemp+" exists");
}
if(category=="image"){
obj.fs.writeFileSync(obj.directorytemp+'/'+obj.files[keys].originalname,obj.files[keys].buffer);
obj.sharp(obj.directorytemp+'/'+obj.files[keys].originalname)
.tile({size:1024})
.toFile(obj.directorytemp+'/'+obj.files[keys].originalname+'.dz',function(err,info){
if(err){
return console.log(err);
}else if(info){
console.log(info);
fileuploader(obj,obj.directorytemp,function(obj){
console.log("Uploading "+obj.files[keys].originalname+"...");
});
}
});
}
}else{
callback(false,'No files for upload');
}
}
callback(false,"All files were uploaded");
}else{
callback('Bad request: File uploader forbidden request',false);
}
}

function fileuploader(obj,directory,callback){
var itemsa=obj.fs.readdirSync(directory+'/');
for(var keya in itemsa){
if(itemsa[keya]!=="log.log"){
var dira=itemsa[keya];
if(obj.fs.existsSync(directory+'/'+dira)){
var stata=obj.fs.statSync(directory+'/'+dira);
if(stata.isDirectory()){

var itemsb=obj.fs.readdirSync(directory+'/'+dira+'/');
for(var keyb in itemsb){
if(itemsb[keyb]!=="log.log"){
var dirb=dira+'/'+keyb+'';
if(obj.fs.existsSync(directory+'/'+dirb)){
var statb=obj.fs.statSync(directory+'/'+dirb);
if(statb.isDirectory()){

var itemsc=obj.fs.readdirSync(directory+'/'+dirb+'/');
for(var keyc in itemsc){
if(itemsc[keyc]!=="log.log"){
var dirc=dirb+'/'+itemsc[keyc];
if(obj.fs.existsSync(directory+'/'+dirc)){
var statc=obj.fs.statSync(directory+'/'+dirc);
if(statc.isDirectory()){
console.log('Max Limit Reached while reading directories');
}else{

var filenamec=obj.path.basename(dirc,obj.path.extname(dirc))+obj.path.extname(dirc);
var purenamec=obj.title+"/"+dirc.replace(new RegExp(obj.path.extname(dirc)+'$'),"");
var directoryc=dirc.replace(new RegExp(filenamec+'$'),"");
obj.cloudinary.uploader.upload(directory+'/'+dirc,function(){},
{public_id:purenamec,resource_type:"auto",version:'1312461204'});

}
}
}
}
}else{

var filenameb=obj.path.basename(dirb,obj.path.extname(dirb))+obj.path.extname(dirb);
var purenameb=obj.title+"/"+dirb.replace(new RegExp(obj.path.extname(dirb)+'$'),"");
var directoryb=dirb.replace(new RegExp(filenameb+'$'),"");
obj.cloudinary.uploader.upload(directory+'/'+dirb,function(){},
{public_id:purenameb,resource_type:"auto",version:'1312461204'});

}
}
}
}
}else{

var filenamea=obj.path.basename(dira,obj.path.extname(dira))+obj.path.extname(dira);
var purenamea=obj.title+"/"+dira.replace(new RegExp(obj.path.extname(dira)+'$'),"");
var directorya=dira.replace(new RegExp(filenamea+'$'),"");

obj.cloudinary.uploader.upload(directory+'/'+dira,function(result){
if(result.format=="jpg" || result.format=="png" || result.format=="jpeg" || result.format=="avi" || result.format=="wmv" || result.format=="mp4"){
console.log("File: "+result.original_filename+"."+result.format);
console.log("Link: "+result.secure_url);
var jsonobj={"title":obj.title,"name":result.original_filename,"url":result.secure_url,"type":result.format,"subject":obj.subject};

var mediacrud=new obj.basemultimidia(obj.author,obj.title,jsonobj,obj.adm);
mediacrud.inpublic(function(mediaerr,mediaresults){
if(mediaerr){
return console.log("Error: "+mediaerr);
}else{
console.log(mediaresults);
}
});

}
},
{public_id:purenamea,resource_type:"auto",version:'1312461204'});

}
}
}
}
for(var key in obj.directories){
if(typeof obj.directories[key]!=="undefined"){
var length=obj.directories.length-1;
obj.fsextra.remove(obj.directories[key],err=>{
if(err){
return console.error(err);
}else if(parseInt(key)===length){
callback(obj);
}
});
}
}

}
basecloudupload.prototype.inpublic=function(callback){
return inprivate.call(this,callback);
};
return basecloudupload;
})();
module.exports=basecloudupload;