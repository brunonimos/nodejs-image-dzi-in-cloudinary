var basecontent=(function(){
function basecontent(content){
this.connection=require('./database');
if(typeof content!=="undefined" && content!==""){
this.content=content;
this.validmedia="yap";
}
}
function inprivate(callback){
var obj=this;
var data=[];
if(obj.content=="all"){
obj.content="yap";
obj.querycontent="SELECT * FROM content ORDER by date DESC";
obj.querymultimidia="SELECT * FROM multimidia";
}
obj.connection.connect().then(client=>{
return client.query(obj.querycontent).then(contentres=>{
client.release();
data.push(contentres.rows);
return client.query(obj.querymultimidia).then(multimidiares=>{
data.push(multimidiares.rows);
for(var keya in data[1]){
if(typeof data[1][keya]!=="undefined"){
for(var keyb in data[0]){
if(typeof data[0][keyb]!=="undefined"){
if(data[1][keya].titulo==data[0][keyb].titulo){
if(data[1][keya].extension=="jpg" || data[1][keya].extension=="png" || data[1][keya].extension=="gif"){
if(typeof data[0][keyb].image=="undefined"){
data[0][keyb].image=[];
}
var imgobj={"name":data[1][keya].name,"link":data[1][keya].link,"type":data[1][keya].extension,"publisher":data[1][keya].autor,"tag":data[1][keya].subject};
data[0][keyb].image.push(imgobj);
}
if(data[1][keya].extension=="avi" || data[1][keya].extension=="wmv" || data[1][keya].extension=="mp4"){
if(typeof data[0][keyb].video=="undefined"){
data[0][keyb].video=[];
}
var videobj={"name":data[1][keya].name,"link":data[1][keya].link,"type":data[1][keya].extension,"publisher":data[1][keya].autor,"tag":data[1][keya].subject};
data[0][keyb].video.push(videobj);
}
}
}
}
}
}
callback(false,data[0]);
}).catch(e=>{
client.release();
console.log(e.stack);
});
}).catch(e=>{
client.release();
console.log(e.stack);
});
});
}
basecontent.prototype.inpublic=function(callback){
return inprivate.call(this,callback);
};
return basecontent;
})();
module.exports=basecontent;