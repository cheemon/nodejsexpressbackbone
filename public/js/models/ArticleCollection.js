define(function() {
    var Article = Backbone.Model.extend({

    });

    var articleList=Backbone.Collection.extend({
        initialize:function(){

        },
        model:Article,
        url:"/articles"
    });
    return articleList;
});
