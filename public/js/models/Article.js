define(function() {
    var Article = Backbone.Model.extend({
        urlRoot: '/Article/'
    });

    return Article;
});