define(['text!templates/register.html'],function(registerTemplate){
    var registerView=Backbone.View.extend({
        el:$('#content'),
        events:{
            "click #registerBtn":'register'
        },

        register:function(){
            var userName= $.trim($('input[name=username]').val());
            var password=$('input[name=password]').val();
            var cpassword=$('input[name=cpassword]').val();
            var patten = /^[a-zA-Z]\w{5,17}$/;
            if(null==userName||userName.length==0){
                $('#error').text('请输入用户名');
                $('#error').slideDown();
            }else if(!patten.test(userName)){
                $('#error').text('用户名只能以字母开头，长度在6~18之间，只能包含字符、数字和下划线');
                $('#error').slideDown();
            }else if(null==password||password.length==0){
                $('#error').text('请输入密码');
                $('#error').slideDown();
            }else if(password.length<6){
                $('#error').text('密码长度不能少于6位');
                $('#error').slideDown();
            }else if(null==cpassword||cpassword.length==0){
                $('#error').text('请输入确认密码');
                $('#error').slideDown();
            }else if(password!=cpassword){
                $('#error').text('密码不一致');
                $('#error').slideDown();
            }
            else {
                $.post('/register', {
                    username: userName,
                    password: password
                }, function (data) {
                     window.location.hash='index';
                });
            }
            return false;
        },
        render:function(){
            this.$el.html(registerTemplate);
        }
    });

    return new registerView;
});