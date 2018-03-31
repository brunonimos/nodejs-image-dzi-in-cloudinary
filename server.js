var express=require('express');
var bodyParser=require('body-parser');
var multer=require('multer');
var baseeditor=require('./resources/content_editor');
var basetruncate=require('./resources/content_deleter');
var basecontent=require('./resources/content_loader');

var app=express();

var storage=multer.memoryStorage();
var upload=multer({storage:storage});

var https=function(req,res,next){
if(process.env.NODE_ENV==='production'){
if(req.headers['x-forwarded-proto']!='https'){
return res.redirect('https://'+req.headers.host+req.url);
}else{
return next();
}
}else{
return next();
}
};

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',parameterLimit:1000000,extended:true}));

app.set('views',__dirname+'/public/');
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');
app.set('port',(process.env.PORT || 5000));
app.use(express.static(__dirname+'/public'));
app.use(https);

app.post('/content',function(req,res){
var content=req.body.content;
var contentloader=new basecontent(content);
contentloader.inpublic(function(err,contents){
if(err){
res.json({'MENSAGEM':err});
}else if(contents){
res.json({'contents':contents});
}
});
});

app.post('/edit',upload.array('files'),function(req,res){
var titles={'newtitle':req.body.newtitle};
var edit=new baseeditor(req.body.author,titles,req.files);
edit.inpublic(function(err,result){
if(err){
res.redirect('./500.html');
}else if(result){
res.redirect('/');
}
});
});

app.post('/truncate',function(req,res){
var titles={'oldtitle':req.body.title};
var truncater=new basetruncate(titles);
truncater.inpublic(function(err,result){
if(err){
res.redirect('./500.html');
}else if(result){
res.redirect('/');
}
});
});

app.get('/*/*',function(req,res){
res.render('500');
});

app.get('/*',function(req,res){
res.render('home');
});

app.listen(app.get('port'),function(){
console.log("Application running");
});
