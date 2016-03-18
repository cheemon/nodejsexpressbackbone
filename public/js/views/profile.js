define(['PhotographNetView','text!templates/profile.html'],
function(PhotographNetView,profileTemplate){
    var profileView=PhotographNetView.extend({
        el:$('#content'),
        initialize:function(){
            this.model.bind('change',this.render,this);
        },
        template: _.template(profileTemplate),
        render:function(){
            this.$el.html(this.template({model:this.model.toJSON()}));
        }
    });
    return profileView;
});