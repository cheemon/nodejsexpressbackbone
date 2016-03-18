define(['PhotographNetView','text!templates/articleadd.html','fileinput','fileinput_locale_zh','bootstrap'],
    function(PhotographNetView,Template){
        var  View=PhotographNetView.extend({
            el:$('#content'),
            template: _.template(Template),
            render:function(){
                this.$el.html(this.template());

            },
            events:{
                "click #submitBtn":"add"
            },
            add:function(){

                var title= $.trim($('input[name=title]').val());
                var content= $.trim($('textarea[name="content"]').val());
                if(null==title||title.length==0) {
                    $('#error').text('请输入标题');
                    $('#error').slideDown();
                }else if(null==content||content.length==0){
                    $('#error').text('请输入文章内容');
                    $('#error').slideDown();
                }else{
                    $.post('/article/add', {
                        title: title,
                        content: content
                    }, function (data) {
                        $('#error').text('发布成功');
                        $('#error').slideDown();
                        $('input[name=title]').val('');
                        $('textarea[name="content"]').val('');
                    }).error(function () {
                        $('#error').text('发布失败');
                        $('#error').slideDown();
                    });
                }
                return false;
            }
        });
        return View;
    });