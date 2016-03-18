module.exports=function(app,models) {
    var formidable=require('formidable');
    var fs=require('fs');
    var key_id=0;

    app.post('/article/uploadpic', function(req, res) {
        var uploadUrl="./public/uploadFile/article";
        var saveUrl='/uploadFile/';
        var form=new  formidable.IncomingForm();
        form.uploadDir = "./tmp";

        form.parse(req,function(error, fields, files){

            for(var key in files) {
                key_id=1+key_id;
                var file = files[key];
                var types       = file.name.split('.');
                var date        = new Date();
                var ms          = Date.parse(date)+key_id;

                fs.renameSync(file.path,uploadUrl+ ms +"."+String(types[types.length-1]),function(){

                    console.log(error);

                });

            }

            res.send(200);
        });
    });
    app.post('/article/add',function(req,res){
        var title=req.param('title',null);
        var content =req.param('content',null);
        if(null==title||title.length<1){
            res.send(400);
            return;
        }else  if(null==content||content.length<1){
            res.send(400);
            return;
        }

        (models.Article.add(title,content,new Date(),new Date()));
        res.send(200);
    });

    app.get('/article/:id', function(req, res) {

        var id = req.param('id',null);;
console.log(id);
        models.Article.findById(id, function (article) {
            res.send(article);
        });
    });
    app.get('/articles', function(req, res) {

        models.Article.findList(function (articles) {
            res.send(articles);
        });
    });
}