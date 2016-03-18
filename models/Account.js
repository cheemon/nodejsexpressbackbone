/*
 * @author  Cheemon   2016-03-02
 * email    cheemonnet@gmail.com
 */
module.exports=function(config,mongoose){
    var crypto=require('crypto');

    var AccountSchema=new mongoose.Schema({
        username:{type:String,unique:true},
        nickname:String,
        password:String,
        email:String,
        photourl:String
    });

    var Account=mongoose.model('Account',AccountSchema);

    var login=function(userName,password,callback){
        var shaSum=crypto.createHash('sha256');
        shaSum.update(password);
        console.log('userName:'+userName+'password:'+password);
        Account.findOne({username:userName,password:shaSum.digest('hex')},function(err,doc){

            callback(null!=doc);
        });

    };
    var registerCallback=function(err){
        if(err){
            return console.log(err);
        }
        return console.log('Account was created');
    }
    var register=function(username,password){
        var shaSum=crypto.createHash('sha256');
        shaSum.update(password);
        console.log('Register '+username);
        var user=new Account({
            username:username,
            password:shaSum.digest('hex')
        });
        user.save(registerCallback);
        console.log('Save Command was send');

    };
    var findByUserName = function(username, callback) {
        Account.findOne({username:username}, function(err,doc) {
            callback(doc);
        });
    };
    var findById = function(id, callback) {
        Account.findOne({username:'admin'}, function(err,doc) {
            callback(doc);
        });
    };
    return {
        findById:findById,
        findByUserName:findByUserName,
        login:login,
        register:register
    }
}