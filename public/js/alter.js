var alter=(function(){
function alter(){}
function inprivate(trigger){
alterar(trigger);
}
function alterar(trigger){
var major=trigger.parentNode;
var form=$(major)[0].getElementsByClassName("editar")[0];
var files=form.files;
var formNewTitle=form.newtitle;
var formCommit=form.commit;
var imgContainer=document.getElementById("imagesPreview");
var imgList=[];
form.style.display="block";
trigger.style.display="none";
formCommit.style.display="block";
formNewTitle.focus();
imgContainer.style.display="table-header-group";
imgContainer.style.minHeight="8em";
files.addEventListener("change",function(e){
e.preventDefault();
var images=document.getElementById("imagesPreview");
images.innerHTML="";
for(var multimidia in this.files){
if(multimidia!=="length" && multimidia!=="item"){
if(this.files[multimidia].type.match('image.*') || this.files[multimidia].type.match('video.*')){
var reader=new FileReader();
reader.readAsDataURL(this.files[multimidia]);
reader.onload=function(e){
var filePath=files.value.lastIndexOf('\\')+1;
var name=files.value.substr(filePath);
name=name.replace(/[&\/\\#,+$~%'":*?<>={}]/gi,"");
name=name.replace(/ /gi,"");
var fileIndex=files.value.lastIndexOf('.')+1;
var extension=files.value.substr(fileIndex);
if(extension.toLowerCase()=="jpg" || extension.toLowerCase()=="png" || extension.toLowerCase()=="jpeg"){
var dad=document.createElement("div");
var image=document.createElement("img");
dad.style.display="inline-block";
image.className="imagepreviewEdit";
image.id=name;
image.src=e.target.result;
images.appendChild(dad);
dad.appendChild(image);
imgList.push(name);
}
};
}
}
}
});
form.addEventListener("reset",function(){
for(var key in imgList){
if(imgList[key]!==null){
console.log(imgList[key]);
var image=document.getElementById(""+imgList[key]+"");
if(image!==null){
image.parentNode.removeChild(image);
}
}
}
});
form.addEventListener("submit",function(e){
e.preventDefault();
form.action="your server url/edit";
form.enctype="multipart/form-data";
if(form.newtitle.value!=="" && form.author.value!==""){
form.submit();
}
});
}
alter.prototype.inpublic=function(trigger){
return inprivate.call(this,trigger);
};
return alter;
})();
function alterbridge(trigger){
var altobj=new alter();
altobj.inpublic(trigger);
}