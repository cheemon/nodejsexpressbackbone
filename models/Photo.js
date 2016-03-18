module.exports=function(config,mongoose){
    var PhotoSchema=new mongoose.Schema({
        albumid:String,
        name:{type:String},
        url:String,
        description:String
    });

    var Photo=mongoose.model('Photo',PhotoSchema);
    var addCallback=function(err){
        if(err){
            return console.log(err);
        }
        return console.log('Photo was added');
    }
    var add=function(albumid,name,url,description){
        var user=new Photo({
            albumid:albumid,
            name:name,
            url:url,
            description:description
        });
        user.save(addCallback);

    };
    var findList = function(albumid,callback) {
        console.log('albumid:'+albumid);
        Photo.find({"albumid":albumid},function(err,doc){
            console.log(doc);
            callback(doc);
        });

    };
    return {
        add:add,
        findList:findList
    }
}