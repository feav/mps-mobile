routes = [{
        path: '/',
        url: './index.html',
    },
    {
        path: '/actu-promo/',
        async: function(routeTo, routeFrom, resolve, reject) {
            // Router instance
            var router = this;

            // App instance
            var app = router.app,
                app_resolve = resolve;

            // Show Preloader
            app.preloader.show();

            app.request.json(
                app.data.mpsJsonBase + 'bookmaker/promo', {},
                function(data) {
                    app.preloader.hide();
                    // console.log(data);
                    // data = {};

                    if (!Object.keys(data).length) {
                        resolve({ url: './pages/page-no-promo.html' });
                    } else {
                        // COnvert break line to br
                        data.message = data.message.replace(/\r?\n/g, '<br />');
                             let promo_infos = {};
                             
                             if(data.promo_is_external == true){
                             promo_infos['promo_url'] = data.promo_external_link_text;
                             }else{
                             promo_infos['promo_url'] = data.metas['bookmaker-site-url'];
                             }
                             resolve({ componentUrl: './pages/page-promo.html' }, {
                            context: {
                                promo: data,
                                     promo_infos: promo_infos,
                            }
                        });
                    }
                },
                function(xhr, status) {
                    app.preloader.hide();

                    setTimeout(function() {
                        app.dialog.alert('Une érreur est survenue! Vérifiez votre connexion et essayez de nouveau !', 'Echec !');
                    }, 3000);
                }
            );
        },
        // url: './pages/page-promo.html',
    },
    {
        path: '/bookmaker/:id',
        async: function(routeTo, routeFrom, resolve, reject) {
            // Router instance
            var router = this;

            // App instance
            var app = router.app;

            // Show Preloader
            app.preloader.show();

            // User ID from request
            var pageId = routeTo.params.id;

            app.request.json(
                app.data.mpsJsonBase + 'pages/' + pageId, {},
                function(data) {
                    app.preloader.hide();
                    // console.log(data);

                    resolve({
                        componentUrl: './pages/page-bookmaker.html',
                    }, {
                        context: {
                            data: data,
                            // bookcontent: data,
                        }
                    });

                },
                function(xhr, status) {
                    this.app.preloader.hide();
                    setTimeout(function() {
                        app.dialog.alert('Une érreur est survenue! Vérifiez votre connexion et essayez de nouveau !', 'Echec !');
                    }, 3000);
                }
            );
        },
    },
    {
        path: '/quizz/',
        url: './pages/quizz.html'
    },
    {
        path: '/quizz/result/:id',
        async: function(routeTo, routeFrom, resolve, reject) {
            // Router instance
            var router = this;

            // App instance
            var app = router.app;

            // Show Preloader
            app.preloader.show();

            // User ID from request
            var termId = routeTo.params.id;

            app.request.json(
                app.data.mpsJsonBase + 'bookmaker/' + termId, {},
                function(data) {
                    app.preloader.hide();
                    console.log(data);

                    resolve({
                        componentUrl: './pages/quizz-result.html',
                    }, {
                        context: {
                            data: data,
                        }
                    });
                },
                function(xhr, status) {
                    app.preloader.hide();
                    setTimeout(function() {
                        app.dialog.alert('Une érreur est survenue! Vérifiez votre connexion et essayez de nouveau !', 'Echec !');
                    }, 3000);
                }
            );
        },
        url: './pages/quizz-result.html',
    },
    {
        path: '/about/',
        url: './pages/about.html',
    },
    {
        path: '/legal-notice/',
        // url: './pages/legal-notice.html',
        async: function(routeTo, routeFrom, resolve, reject) {
            // Router instance
            var router = this;

            // App instance
            var app = router.app,
                app_resolve = resolve;

            // Show Preloader
            app.preloader.show();

            app.request.json(
                app.data.mpsJsonBase + 'pages/?slug=mentions-legales', {},
                function(data) {
                    app.preloader.hide();
                    // console.log(data);

                    resolve({ componentUrl: './pages/legal-notice.html' }, {
                        context: {
                            content: data[0].content.rendered,
                        }
                    });
                },
                function(xhr, status) {
                    app.preloader.hide();

                    setTimeout(function() {
                        app.dialog.alert('Une érreur est survenue! Vérifiez votre connexion et essayez de nouveau !', 'Echec !');
                    }, 3000);
                }
            );
        },
    },
    {
        path: '/landing-popup/',
        url: './pages/landing-popup.html',
    },
    // Default route (404 page). MUST BE THE LAST
    {
        path: '(.*)',
        url: './pages/404.html',
    },
];
