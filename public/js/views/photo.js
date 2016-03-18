define(['PhotographNetView','text!templates/photo.html','fileinput','fileinput_locale_zh','bootstrap'],
    function(PhotographNetView,photoTemplate) {

    var photoView = PhotographNetView.extend({
        el: $('#content'),
        events:{
            "click submitBtn":"add"
        },
        add:function(){
            console.log('click add');


            //$.post('/photo/add',{
            //    name:$('input[name=name]').val(),
            //    describe:$('input[name=describe]').val()
            //},function(data){
            //    console.log('login back111111111');
            //    window.location.hash='account';
            //}).error(function(){
            //    $('#error').text('无法登录');
            //    $('#error').slideDown();
            //});
            return false;
        },
        initUpload:function(){
            $("#file-1").fileinput({
                uploadUrl: '/upload/photos', // you must set a valid URL here else you will get an error
                allowedFileExtensions: ['jpg', 'png', 'gif'],
                overwriteInitial: false,
                maxFileSize: 1000,
                maxFilesNum: 10,
                uploadExtraData:{albumid:$('input[name=albumid]').val()},
                slugCallback: function (filename) {

                    return filename.replace('(', '_').replace(']', '_');
                }
            });
            $('#file-1').on('fileunlock', function(event, filestack, extraData) {
                $('#file-1').fileinput('reset');
            });
        },
        initialize:function(){
            this.collection.bind('reset',this.render,this);

        },
        template: _.template(photoTemplate),
        render: function() {
            console.log('vvvvv');
            console.log(this.collection.toJSON());
            this.$el.html(this.template({collection:this.collection.toJSON(),ablumid:'"'+this.model.albumid+'"'}));
            this.initUpload();
        }
    });

    return   photoView;
});
