module.exports=function(app,models) {
    var formidable=require('formidable');
    var fs=require('fs');
    var key_id=0;

    app.post('/upload/photos', function(req, res) {
        var uploadUrl="./public/uploadFile/";
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
                    console.log('ffffffffffffffffffff');
                    console.log(error);

                });
                models.Photo.add(fields["albumid"],null,saveUrl+ ms +"."+String(types[types.length-1]),null);

            }
            models.Album.updateCover(fields["albumid"],saveUrl+ ms +"."+String(types[types.length-1]),null);
            res.send(200);
        });
    });
    app.post('/photo/update',function(req,res){
        var name=req.param('name',null);
        var url=req.param('url',null);
        var descripe=req.param('descripe',null);
        if(null==name||null==url){
            res.send(400);
            return;
        }

        models.register(username,password);
        res.send(200);
    });
    app.get('/photos/:albumid', function(req, res) {
        console.log('node routes photo/:albumid'+req.params.albumid);
        models.Photo.findList(req.params.albumid,function (albums) {
            res.send(albums);
        });
    });
}