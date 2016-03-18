define(['text!templates/login.html'],function(loginTemplate){
    var loginView=Backbone.View.extend({
        el:$('#content'),
        events:{
            "click #loginBtn":"login"
        },
        login:function(){
            var userName= $.trim($('input[name=username]').val());
            var password= $.trim($('input[name=password]').val());
            if(null==userName||userName.length==0){
                $('#error').text('请输入用户名');
                $('#error').slideDown();
            }else if(userName.length<3){
                $('#error').text('用户名长度不能少于3位');
                $('#error').slideDown();
            }else if(null==password||password.length==0){
                $('#error').text('请输入密码');
                $('#error').slideDown();
            }else if(password.length<4){
                $('#error').text('密码长度不能少于4位');
                $('#error').slideDown();
            }
            else {
                $.post('/login', {
                    username: userName,
                    password: password
                }, function (data) {
                    window.location.hash = 'index';
                }).error(function () {
                    $('#error').text('用户名或者密码错误');
                    $('#error').slideDown();
                });
            }
            return false;
        },

        render:function(){

            this.$el.html(loginTemplate);
            $('#error').hide();
        }
    });

    return new loginView;
});