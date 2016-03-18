define(['PhotographNetView','text!templates/album.html'], function(PhotographNetView,albumTemplate) {

    var albumView = PhotographNetView.extend({
        el: $('#content'),
        events:{
            "submit #albumForm":"add"
        },
        initialize:function(){
           this.collection.bind('reset',this.render,this);
        },
        template: _.template(albumTemplate),
        render: function() {
            this.$el.html(this.template({model:this.collection.toJSON()}));

        },
        add:function(){
            $.post('/album/add',{
                name:$('input[name=name]').val(),
                description:$('input[name=description]').val(),
                createtime:new Date(),
                updatetime:new Date()
            },function(data){

            }).error(function(){

            });
            return false;
        }

    });

    return  albumView;
});
