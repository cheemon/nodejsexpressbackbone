define(function() {
    var Photo = Backbone.Model.extend({

    });

    var photoList=Backbone.Collection.extend({
        initialize:function(){

        },
        model:Photo
    });
    return photoList;
});
