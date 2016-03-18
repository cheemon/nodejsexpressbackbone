define(['text!templates/index.html'], function(indexTemplate) {
    var indexView = Backbone.View.extend({
        el: $('#content'),
        initialize:function(){
            this.collection.bind('reset',this.render,this);
        },
        template: _.template(indexTemplate),
        render: function() {
            this.$el.html(this.template({model:this.collection.toJSON()}));

        }
    });

    return indexView;
});
