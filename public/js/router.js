define(['views/index','views/login','views/register','views/account','views/album','views/photo',
        'views/profile','models/Account','models/AlbumCollection','models/photoCollection','models/Article','views/article',
    'views/homepage','views/articleadd','models/ArticleCollection'],
    function(IndexView,LoginView,RegisterView,accountView,albumView,photoView,ProfileView,Account,AlbumCollection,photoCollection,Article,ArticleView,
    HomePageView,ArticleAddView,ArticleCollection){
        var PhotographRouter=Backbone.Router.extend({
            currentView:null,
            routes:{
                "account":"account",
                "index":"index",
                "login":"login",
                "register":"register",
                "admin!album":"admin_album",
                "admin!photo/:query":"admin_photo",
                "profile/:id":"profile",
                "article/:id":"article",
                "homepage/:userid":"homepage",
                "articleadd":"articleAdd"

            },
            changeView:function(view){
                if(null!=this.currentView){
                    this.currentView.undelegateEvents();
                }
                this.currentView=view;

                this.currentView.render();
            },
            index:function(){
               //this.changeView(IndexView);

                var articleModel = new ArticleCollection();

                this.changeView(new IndexView({collection:articleModel}));
                articleModel.fetch({reset:true});
            },
            login:function(){
                console.log('aaa');
                this.changeView(LoginView);
            },
            register:function(){
                this.changeView(RegisterView);
            },
            account:function(){
                this.changeView(accountView);
            },
            admin_album:function(){

                var albumModel = new AlbumCollection();

                this.changeView(new albumView({collection:albumModel}));
                albumModel.fetch({
                    reset:true,
                    success:function(collection,response,options){

                    }
                });
            },
            admin_photo:function(query){

                var photoModel=new photoCollection({albumid:query});
                photoModel.url = '/photos/' + query;
                photoModel.albumid=query;
                this.changeView(new photoView({collection:photoModel,model:{albumid:query}}));
                photoModel.fetch({
                    reset:true,
                    success:function(collection,response,options){

                    }
                });
            },
            profile: function(id) {

                var accmountModel = new Account({id:id});

                this.changeView(new ProfileView({model:accmountModel}));
                accmountModel.fetch();

            },
            article:function(id){
                var articleModel = new Article({id:id});
                this.changeView(new ArticleView({model:articleModel}));
                articleModel.fetch();
            },
            homepage:function(userid){
                var accmountModel = new Account({userid:userid});
                this.changeView(new HomePageView({model:accmountModel}));
                accmountModel.fetch();
            },
            articleAdd:function(){
                this.changeView(new ArticleAddView());
            }
        }
    );
    return new PhotographRouter();
});