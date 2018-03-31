var kickout=(function(){
function kickout(){}
function inprivate(){
sessao();
}
function sessao(){
var msg=document.getElementById("msg");
var msgtext=msg.children[0];
var article=document.getElementById("article");
var app=angular.module('myApp',[]);
app.controller('myCtrl',function($scope,$http){
var content="all";
$http({
method:'POST',
url:'your server url/content',
data:$.param({content:content}),
headers:{'Content-Type':'application/x-www-form-urlencoded'}
}).then(
function(returnedData){
$scope.contents=returnedData.data.contents;
$scope.date=new Date();
$(document).ready(function(){
if($scope.contents.MENSAGEM){
msg.className="animated fadeIn";
window.setTimeout(function fadeOut(){
msg.className="off";
},3000);
msgtext.innerHTML=$scope.contents.MENSAGEM;
}else{
window.setTimeout(function fadeOut(){
article.className="animated fadeIn";
},1000);
}
var carousels=document.getElementsByClassName("owl-carousel");
for(var key=0;key<=carousels.length;key++){
if(typeof carousels.item(key)!=="undefined" && carousels.item(key)!==null){
var mediacaroulsel=false;
var optionsMedia={};
if(carousels.item(key).id=="media"){
mediacaroulsel=true;
optionsMedia={responsive:{0:{items:1},300:{items:2},600:{items:3},800:{items:4},1000:{items:5}},animateIn:'zoomInRight',animateOut:'zoomOutLeft'};
$(carousels.item(key)).owlCarousel(optionsMedia);
}
}
}
});
},
function(returnedData){
console.log(returnedData.status);
window.location.replace("./"+returnedData.status+".html");
}
);
});
}
kickout.prototype.inpublic=function(){
return inprivate.call(this);
};
return kickout;
})();
var kickoutobj=new kickout();
kickoutobj.inpublic();