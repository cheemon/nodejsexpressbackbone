module.exports=function(config,mongoose){
    var ArticleSchema=new mongoose.Schema({
        title:String,
        content:{type:String},
        pic:String,
        location:String,
        addtime:Date,
        userid:String,
        updatetime:Date
    });

    var Article=mongoose.model('Article',ArticleSchema);
    var addCallback=function(err){
        if(err){
            return false;
        }
        return true;
    }
    var add=function(title,content,addtime,updatetime){
        var article=new Article({
            title:title,
            content:content,
            addtime:addtime,
            updatetime:updatetime
        });
        article.save(addCallback);

    };
    var findList = function(callback) {

        Article.find({},function(err,doc){

            callback(doc);
        });

    };
    var findById = function(id,callback) {
        console.log(id);
        Article.findOne({"_id":id},function(err,doc){

            callback(doc);
        });

    };
    return {
        add:add,
        findList:findList,
        findById:findById
    }
}