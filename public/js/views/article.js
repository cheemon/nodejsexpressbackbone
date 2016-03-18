define(['PhotographNetView','text!templates/article.html'],
    function(PhotographNetView,ArticleTemplate){
        var  View=PhotographNetView.extend({
            el:$('#content'),
            initialize:function(){
                this.model.bind('change',this.render,this);
            },
            template: _.template(ArticleTemplate),
            render:function(){
                console.log('article render');
                console.log(this.model.toJSON());
                this.$el.html(this.template({model:this.model.toJSON()}));
            }
        });
        return  View;
    });