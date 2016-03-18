require.config({
    paths: {
        jQuery: '/js/libs/jquery-1.11.3.min',
        Underscore: '/js/libs/underscore.min',
        Backbone: '/js/libs/backbone.min',
        text: '/js/libs/text',
        templates: '../templates',
        fileinput:'/js/libs/fileinput',
        fileinput_locale_zh:'/js/libs/fileinput_locale_zh',
        bootstrap:'/js/libs/bootstrap.min'

    },

    shim: {
        'Backbone': ['Underscore', 'jQuery'],
        'PhotographNet': ['Backbone'],
        'fileinput_locale_zh':['fileinput']

    }
});

require(['PhotographNet'], function(SocialNet) {
    SocialNet.initialize();
});
