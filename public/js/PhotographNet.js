//define(['views/index'], function(indexView) {
//    var initialize = function() {
//
//        indexView.render();
//    }
//
//    return {
//        initialize: initialize
//    };
//});
define(['router'],function(router){
    var initialize=function(){
        runApplication(checkLogin);
    };

    var checkLogin=function(callback){
        $.ajax("/account/authenticated",{
            method:"GET",
            success:function(){
                return callback(true);
            },
            error:function(data){
                return callback(false);
            }
        });
    };

    var runApplication=function(authenticated){
        if(authenticated){
            window.location.hash='login';
        }else{

            window.location.hash='index';
        }
        Backbone.history.start();
    };

    return {
        initialize:initialize
    };
});