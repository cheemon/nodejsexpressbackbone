module.exports=function(app,models) {
    app.post('/album/add',function(req,res){

        var name=req.param('name',null);
        var description =req.param('description',null);
        if(null==name||name.length<1){
            res.send(400);
            return;
        }

        models.Album.add(name,description,new Date(),new Date());
        res.send(200);
    });

    app.get('/albums', function(req, res) {

        models.Album.findList(function (albums) {
            res.send(albums);
        });
    });
}