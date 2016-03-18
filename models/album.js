module.exports=function(config,mongoose){
    var AlbumSchema=new mongoose.Schema({
        name:{type:String},
        descripe:String,
        addtime:Date,
        updatetime:Date,
        coverpic:String
    });

    var Album=mongoose.model('Album',AlbumSchema);
    var addCallback=function(err){
        if(err){
            return console.log(err);
        }
        return console.log('Album was added');
    }
    var add=function(name,descripe,addtime,updatetime){
        var albumModel=new Album({
            name:name,
            descripe:descripe,
            addtime:addtime,
            updatetime:updatetime,
            coverpic:""
        });
        albumModel.save(addCallback);

    };
    var findList = function(callback) {
        Album.find({},function(err,doc){
            callback(doc);
        });
        //Album.findOne({name:"第一个相册"},function(err,doc){
        //
        //    callback(doc);
        //});
    };
    var updateCover=function(albumid,coverpic,callback){
        Album.update({_id:albumid}, {$set: {coverpic:coverpic}},{upsert:false},
            function  updateCoverCallback(err) {

            });
    };
    return {
        add:add,
        findList:findList,
        updateCover:updateCover
    }
}