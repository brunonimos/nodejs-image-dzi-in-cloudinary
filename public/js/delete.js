var del=(function(){
function del(){}
function inprivate(trigger){
deletar(trigger);
}
function deletar(trigger){
var major=trigger.parentNode;
var form=$(major)[0].getElementsByClassName("apagar")[0];
var formDeleteAll=form.deleteall;
var formTitle=form.title;
form.style.display="block";
formDeleteAll.style.display="block";
trigger.style.display="none";
form.deleteall.addEventListener("click",function(e){
form.action="your server url/truncate";
e.preventDefault();
if(formTitle.value!==""){
form.submit();
}
});
}
del.prototype.inpublic=function(trigger){
return inprivate.call(this,trigger);
};
return del;
})();
function deletebridge(trigger){
var delobj=new del();
delobj.inpublic(trigger);
}