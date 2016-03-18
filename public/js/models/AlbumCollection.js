define(function() {
    var Album = Backbone.Model.extend({

    });

    var albumList=Backbone.Collection.extend({
        initialize:function(){

        },
        model:Album,
        url:"/albums"
    });
    return albumList;
});
