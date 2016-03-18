define(['text!templates/account.html','fileinput','fileinput_locale_zh','bootstrap'], function(indexTemplate) {

    var indexView = Backbone.View.extend({
        el: $('#content'),
        events:{
            "submit #uploadForm":"add"
        },
        add:function(){
            $.post('/account/add',{
                name:$('input[name=name]').val(),
                describe:$('input[name=describe]').val()
            },function(data){
                console.log('login back111111111');
                window.location.hash='account';
            }).error(function(){
                $('#error').text('无法登录');
                $('#error').slideDown();
            });
            return false;
        },
        initUpload:function(){
            $("#file-1").fileinput({
                uploadUrl: '/upload/photos', // you must set a valid URL here else you will get an error
                allowedFileExtensions: ['jpg', 'png', 'gif'],
                overwriteInitial: false,
                maxFileSize: 1000,
                maxFilesNum: 10,
                //allowedFileTypes: ['image', 'video', 'flash'],
                slugCallback: function (filename) {
                    return filename.replace('(', '_').replace(']', '_');
                }
            });
        },
        render: function() {
            this.$el.html(indexTemplate);
            this.initUpload();
        }
    });

    return new indexView;
});
