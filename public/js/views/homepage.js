define(['PhotographNetView','text!templates/homepage.html'],
    function(PhotographNetView,profileTemplate){
        var HomePageView=PhotographNetView.extend({
            el:$('#content'),
            initialize:function(){
                this.model.bind('change',this.render,this);
            },
            template: _.template(profileTemplate),
            render:function(){
                this.$el.html(this.template({model:this.model.toJSON()}));
            }
        });
        return HomePageView;
    });