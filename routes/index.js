module.exports=function(app,models) {
    /* GET home page. */
    app.get('/', function(req, res, next) {
        res.render('index', { title: 'Application' });
    });

    app.post('/login',function(req,res){


        var username=req.param('username',null);
        var password=req.param('password',null);

        if(null==username||username.length<1||null==password||password.length<1){
            res.send(400);
            return;
        }

        models.Account.login(username,password,function(success){
            if(!success){
                console.log('Account.login 401');
                res.send(401);
                return;
            }
            console.log('login was successful');
            res.send(200);
        });
    });
    app.post('/register',function(req,res){

        var username=req.param('username',null);
        var password=req.param('password',null);
        if(null==username||null==password){
            res.send(400);
            return;
        }

        models.Account.register(username,password);
        res.send(200);
    });
}

