define(function() {
    var Album = Backbone.Model.extend({
        urlRoot: '/Photos/'+this.albumid
    });

    return Album;
});
