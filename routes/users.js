module.exports=function(app,models){
    /* GET users listing. */
    app.get('/account', function(req, res, next) {
        res.render('account', { title: '管理后台' });
    });

    app.get('/account/authenticated', function(req, res) {
        if ( req.session.loggedIn ) {
            res.send(200);
        } else {
            console.log('/account/authenticated 401');
            res.send(401);
        }
    });



    app.get('/accounts/:id/status', function(req, res) {
        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;
        console.log('/accounts/:id/status : '+accountId);
        models.Account.findById(accountId, function(account) {
            res.send(account.status);
        });
    });

    app.post('/accounts/:id/status', function(req, res) {
        var accountId = req.params.id == 'me'
            ? req.session.accountId
            : req.params.id;

        models.Account.findById(accountId, function(account) {
            status = {
                name: account.name,
                status: req.param('status', '')
            };
            account.status.push(status);

            // Push the status to all friends
            account.activity.push(status);
            account.save(function (err) {
                if (err) {
                    console.log('Error saving account: ' + err);
                } else {
                    app.triggerEvent('event:' + accountId, {
                        from: accountId,
                        data: status,
                        action: 'status'
                    });
                }
            });
        });
        res.send(200);
    });
    app.get('/accounts/:id', function(req, res) {

        var accountId = req.params.id == 'me'
            ? 1
            : req.params.id;

        models.Account.findById(accountId, function (account) {
            console.log('/accounts/:id');
            console.log(account);
            res.send(account);
        });
    });
}

