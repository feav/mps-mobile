// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
    root: '#app', // App root element
    id: 'com.top10parissportifs.mobileapp', // App bundle ID
    name: 'Classement Paris Sportifs', // App name
    theme: 'auto', // Automatic theme detection
    // App root data
    data: function() {
        return {
            user: {
                firstName: 'John',
                lastName: 'Doe',
            },
            //mpsJsonBase: 'http://mps.developement.ovh/wp-json/wp/v2/',
            mpsJsonBase: 'https://paris-sportifs-top10.fr/wp-json/wp/v2/',
            pubIsActive_API_URL : "https://paris-sportifs-top10.fr/wp-admin/admin-ajax.php?action=param_api_url_action&param=1",
            pubBrand_API_URL : "https://paris-sportifs-top10.fr/wp-admin/admin-ajax.php?action=param_api_url_action&param=2",
            pubLink_API_URL : "https://paris-sportifs-top10.fr/wp-admin/admin-ajax.php?action=param_api_url_action&param=3"
        };
    },
    on: {
        init: function(page) {
            // console.log('App initialized');
        },
        pageInit: function(page) {
            // do something on page init
            this.methods.loadBookmakerMenu(page.app);

            if (page.name == "home") {
                this.methods.loadComparateur(page.app);
            }

            if (page.name == "bookmaker") {
                $$('.bookmaker-description a').addClass('external');
            }

            if (page.name == "legal-notice") {
                $$('.notice-content a').addClass('external');
            }

            if (page.name == "bookmaker") {
                this.methods.loadBookmakerContent(page.app);
            }

            if (page.name == "quizz") {
                this.methods.loadQuizForm(page.app);
            }

            if (page.name == "actu-promo") {

                $$('#rate-app-btn').on('click', function(e) {
                    console.log('Bonjour ');

                    AppRate.promptForRating();

                });
            }

            if (page.name == "actu-no-promo") {

                $$('#notif-settings-btn').on('click', function(e) {
                    console.log('openNativeSettingsTest is active');

                    var devicePlatform = device.platform;
                    console.log(devicePlatform);

                    if (devicePlatform == 'iOS') {

                        window.cordova.plugins.settings.open("notification_id", function() {
                                console.log('opened settings');
                            },
                            function() {
                                console.log('failed to open settings');
                            }
                        );

                    } else if (devicePlatform == 'Android') {

                        window.cordova.plugins.settings.open("settings", function() {
                                console.log('opened settings');
                            },
                            function() {
                                console.log('failed to open settings');
                            }
                        );

                    }

                });
            }
        },
    },
    // App root methods
    methods: {
        loadBookmakerMenu: function(app) {
            // Load left panel Menu
            app.request.json(
                app.data.mpsJsonBase + 'bookmaker/query', { info: 'all', orderby: 'rank', order: 'DESC' },
                function(data) {
                    var menu_bookmaker = '';

                    for (var item in data) {
                        // console.log(item, data[item]);
                        var bookItem = data[item].term,
                            bookMeta = data[item].term_meta;

                        menu_bookmaker += '<li class="bookmaker-item">' +
                            '<img class="icon img-responsive" src="images/' + (parseInt(item) + 1) + '.png">' +
                            '<a href="/bookmaker/' + bookMeta["id-fiche-bookmaker"] + '" class="link panel-close" data-bookmker="' + bookItem.term_id + '">' + bookItem.name + '</a>' +
                            '</li>';
                    }

                    $$('.bookmaker-item').remove();

                    $$('#left-panel-menu').append(menu_bookmaker);
                    // console.log('Load was performed');
                },
                function(jqXHR, textStatus, errorThrown) {
                    app.preloader.hide();

                    setTimeout(function() {
                        app.dialog.alert('Une érreur est survenue! Vérifiez votre connexion et essayez de nouveau !', 'Echec !');
                    }, 3000);

                    console.log('Could not get posts, server response: ' + textStatus + ': ' + errorThrown);
                }
            );
        },
        loadComparateur: function(app) {

            app.request.json(app.data.mpsJsonBase + 'bookmaker/query', { info: 'all', orderby: 'rank', order: 'DESC' },
                function(data) {
                    var bookmakers = '';
                    // console.log(data);
                    // Cache of the template
                    var template = document.getElementById("template-list-item"),
                        banner = document.getElementById("template-banner");
                    // Get the contents of the template
                    var templateHtml = template.innerHTML;
                    // Final HTML variable as empty string
                    var listHtml = "";

                    // Loop through dataObject, replace placeholder tags
                    // with actual data, and generate final HTML
                    for (var key in data) {
                        dataObjectItem = data[key];
                        term_metas = dataObjectItem.term_meta;
                        // console.log(term_metas);
                        if (!("total-notes" in term_metas)) {
                            term_metas["total-notes"] = 100;
                        }
                        if (!("description" in term_metas)) {
                            term_metas["description"] = '<p>&nbsp;</p>';
                        }
                        if (!("bookmaker-logo" in term_metas)) {
                            term_metas["bookmaker-logo"] = '<p>&nbsp;</p>';
                        }
                        if (!("bookmaker-score" in term_metas)) {
                            term_metas["bookmaker-score"] = '<p>&nbsp;</p>';
                        }
                        if (!("bookmaker-site-url" in term_metas)) {
                            term_metas["bookmaker-site-url"] = '<p>&nbsp;</p>';
                        }

                        listHtml += templateHtml.replace(/{{id}}/g, dataObjectItem.term.id)
                            .replace(/{{name}}/g, dataObjectItem.term.name)
                            .replace(/{{itemOrder}}/g, parseInt(key) + 1)
                            .replace(/{{logo}}/g, term_metas["bookmaker-logo"])
                            .replace(/{{note}}/g, term_metas["bookmaker-score"])
                            .replace(/{{url}}/g, term_metas["bookmaker-site-url"])
                            .replace(/{{page_id}}/g, term_metas["id-fiche-bookmaker"])
                            .replace(/{{description}}/g, term_metas.description.replace('<p></p>', ''))
                            .replace(/{{totalNotes}}/g, term_metas["total-notes"]);
                        // console.log((parseInt(key) + 1) % 5, parseInt(key))

                        if ((parseInt(key) + 1) % 5 == 0 && parseInt(key) > 0) {
                            listHtml += banner.innerHTML;
                        }
                    }

                    app.preloader.hide();

                    // Replace the HTML of #list with final HTML
                    $$('.articles-list').html(listHtml);

                    $$("div[id^='rateYo']").each(function(index) {
                        // console.log(index + ": " + $$(this).data('rating'));
                        var note = parseFloat($$(this).data('rating').replace(',', '.')),
                            notes5 = note * 5 / 10;

                        jQuery(this).rateYo({
                            rating: notes5,
                            ratedFill: "#eaca06",
                            starWidth: "20px"
                        });

                    });

                    var pickerDevice = app.picker.create({
                        inputEl: '.picker-vote',
                        rotateEffect: true,
                        closeByOutsideClick: false,
                        toolbarCloseText: 'Noter',
                        formatValue: function(values) {
                            return values[0];
                        },
                        renderToolbar: function() {
                            return '<div class="toolbar">' +
                                '<div class="toolbar-inner">' +
                                '<div class="left">' +
                                '<a href="#" class="link toolbar-cancel-link">Cancel</a>' +
                                '</div>' +
                                '<div class="right">' +
                                '<a href="#" class="link add-my-vote sheet-close popover-close"><span>Ok</span></a>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
                        },
                        cols: [{
                            textAlign: 'center',
                            values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                        }],
                        on: {
                            opened: function(picker) {
                                console.log('Picker opened');
                                picker.$el.find('.toolbar-cancel-link').on('click', function() {
                                    picker.close();
                                    return false;
                                });

                                picker.$el.find('.add-my-vote').on('click', function() {

                                    var notes5 = parseInt(picker.getValue(0)) * 5 / 10,
                                        ratingId = jQuery(document).find('.numNotes.voting > .jq-ry-container').attr('id');

                                    console.log(notes5);

                                    jQuery(document).find('#' + ratingId).rateYo("option", "rating", notes5);

                                    var currentvotesElt = $$('.numNotes.voting').find('.totalNotes'),
                                        totalVotes = parseInt(currentvotesElt.text());
                                    // console.log(totalVotes);
                                    currentvotesElt.text(totalVotes + 1);

                                    $$('.numNotes.voting').find('.addNote').addClass('voted').text('Noté')
                                    app.dialog.alert('Merci pour votre note !');

                                    $$('.numNotes').removeClass('voting');
                                    return false;
                                });
                            },
                            close: function(pickerElt) {

                            }
                        }
                    });

                    $$(".addNote").click(function() {
                        if ($$(this).hasClass('voted')) {
                            app.dialog.alert('Votre note à déjà été pris en compte!', 'Merci !');
                            return false;
                        }
                        pickerDevice.open();
                        $$(this).closest('.numNotes').addClass('voting');
                    });

                },
                function(jqXHR, textStatus, errorThrown) {
                    app.preloader.hide();
                    setTimeout(function() {
                        app.dialog.alert('Une érreur est survenue! Vérifiez votre connexion et essayez de nouveau !', 'Echec !');
                    }, 3000);

                    console.log('Could not get posts, server response: ' + textStatus + ': ' + errorThrown);
                }
            );

        },
        loadBookmakerContent: function() {

        },
        loadQuizForm: function() {
            app.preloader.show();

            app.request.json(app.data.mpsJsonBase + 'quizz/form', { quiz: 1 },
                function(data) {
                    // console.log(data);
                    // Final HTML variable as empty string
                    var listHtml = '';

                    // Loop through data, replace placeholder tags
                    // with actual data, and generate final HTML
                    for (var key in data) {
                        dataQuestion = data[key]['question'];
                        dataAnswers = data[key]['answers'];

                        listHtml += '<fieldset>' +
                            '<legend>' + (parseInt(key) + 1) + '</legend>';

                        listHtml += '<div class="form-row ">' +
                            '<label for=""> <span class="form-icon ' + dataQuestion.customtextbeforequiz + '"></span> ' + dataQuestion.question_name + '</label>';


                        if (dataQuestion.question_type == 'checkbox') {

                            listHtml += ' <div class="inline-checkbox">';

                            for (var key in dataAnswers) {
                                var answer = dataAnswers[key],
                                    input_name = dataQuestion.quiz_id + '_' + answer.question_id,
                                    input_id = input_name + '_' + key;

                                listHtml += '<div><input type="checkbox" id="' + input_id + '" name="' + input_name + '" value="' + answer.value + '">' +
                                    '<label for="' + input_id + '">' + answer.answer_one + '</label></div>';

                            }

                            listHtml += '</div>';

                        } else {

                            listHtml += ' <div class="inline-radio">';

                            for (var key in dataAnswers) {
                                var answer = dataAnswers[key],
                                    input_name = dataQuestion.quiz_id + '_' + answer.question_id,
                                    input_id = input_name + '_' + key;

                                listHtml += '<div><input type="radio" id="' + input_id + '" name="' + input_name + '" value="' + answer.value + '">' +
                                    '<label for="' + input_id + '">' + answer.answer_one + '</label></div>';

                            }

                            listHtml += ' </div>';

                        }

                        listHtml += ' </div>' +
                            ' </fieldset>';
                    }
                    listHtml += '<div class="form-row form-submit">' +
                        '<button type="submit" name="SendQuiz" class="btn-shadow button open-preloader" value="Valider">Valider</button>' +
                        '</div>';

                    app.preloader.hide();

                    // Replace the HTML of #list with final HTML
                    $$('#mps-quizz .form-fields').html(listHtml);

                    // Bind Events
                    $$('.btn-radio').on('click', function() {
                        $$(this).find('input[type=radio]').prop('checked', true);
                    });

                    $$('.open-preloader').on('click', function(event) {
                        event.preventDefault();
                        app.dialog.preloader('Analyse de vos réponses en cours ..');

                        var formData = app.form.convertToData('#mps-quizz');
                        app.request.json(app.data.mpsJsonBase + 'quizz/result',
                            formData,
                            function(data) {
                                // console.log(parseInt(data.bookmaker));
                                app.dialog.close();
                                if (parseInt(data.bookmaker)) {
                                    mainView.router.navigate('/quizz/result/' + parseInt(data.bookmaker));

                                }
                                // console.log('Load was performed');
                            },
                            function(jqXHR, textStatus, errorThrown) {
                                app.dialog.close();
                                setTimeout(function() {
                                    app.dialog.alert('Une érreur est survenue! Vérifiez votre connexion et essayez de nouveau !', 'Echec !');
                                }, 3000);

                                console.log('Could not get posts, server response: ' + textStatus + ': ' + errorThrown);
                            }
                        );
                    });

                    // console.log('Load was performed');
                },
                function(jqXHR, textStatus, errorThrown) {
                    app.preloader.hide();
                    setTimeout(function() {
                        app.dialog.alert('Une érreur est survenue! Vérifiez votre connexion et essayez de nouveau !', 'Echec !');
                    }, 3000);

                    console.log('Could not get posts, server response: ' + textStatus + ': ' + errorThrown);
                }
            );

        },
    },
    // App routes
    routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
    url: '/'
});

// app.preloader.show();

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function() {
    var username = $$('#my-login-screen [name="username"]').val();
    var password = $$('#my-login-screen [name="password"]').val();

    // Close login screen
    app.loginScreen.close('#my-login-screen');

    // Alert username and password
    app.dialog.alert('Username: ' + username + '<br>Password: ' + password);
});

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:beforein', '.page[data-name="qresults"]', function(e, page) {
    // Do something here when page with data-name="about" attribute loaded and initialized

    var termId = page.route.params.id;

    app.request.json(
        app.data.mpsJsonBase + 'bookmaker/item/' + termId, {},
        function(data) {
            app.preloader.hide();
            console.log(data);

            $$('#bookmaker_name').text(data.term.name);
            $$('.bookmaker_site').attr('href', data.metas['bookmaker-site-url']);
            $$('.bookmaker_site img').attr('src', data.metas['bookmaker-logo']);
        },
        function(xhr, status) {
            app.preloader.hide();

            setTimeout(function() {
                app.dialog.alert('Une érreur est survenue! Vérifiez votre connexion et essayez de nouveau !', 'Echec !');
            }, 3000);
        }
    );
});


// On HOme page init
// $$(document).on('page:init', '.page[data-name="home"]', function (e) {
//     app.methods.loadComparateur();
// });

// app.methods.loadBookmakerMenu(app);


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // Now safe to use device APIs
    AppRate.preferences = {
        displayAppName: 'Classement Paris Sportifs',
        usesUntilPrompt: 5,
        promptAgainForEachNewVersion: false,
        inAppReview: true,
        storeAppURL: {
            ios: 'com.top10parissportifs.mobileapp',
            android: 'market://details?id=com.top10parissportifs.mobileapp',
            windows: 'ms-windows-store://pdp/?ProductId=<the apps Store ID>',
            blackberry: 'appworld://content/[App Id]/',
            windows8: 'ms-windows-store:Review?name=<the Package Family Name of the application>'
        },
        customLocale: {
            title: "Voudriez vous donner une note %@?",
            message: "Cela ne prendra pas plus d’une minute et nous aidera à promouvoir notre application. Merci pour votre aide!",
            cancelButtonLabel: "Non, merci",
            laterButtonLabel: "Rappellez-moi plus tard",
            rateButtonLabel: "Évaluer maintenant",
            yesButtonLabel: "Oui!",
            noButtonLabel: "Pas vraiment",
            appRatePromptTitle: 'Aimez-vous utiliser %@',
            feedbackPromptTitle: 'Voudriez vous faire quelques commentaires?',
        },
        callbacks: {
            handleNegativeFeedback: function() {
                window.open('mailto:feedback@example.com', '_system');
            },
            onRateDialogShow: function(callback) {
                callback(1) // cause immediate click on 'Rate Now' button
            },
            onButtonClicked: function(buttonIndex) {
                console.log("onButtonClicked -> " + buttonIndex);
            }
        }
    };

    window.FirebasePlugin.onNotificationOpen(function(notification) {
        console.log(notification);
        mainView.router.navigate('/landing-popup/');
        //alert(JSON.stringify(notification.url, null, 4));
        setTimeout(
            function(){
                $$("#brand").css("background-image",'url('+notification.brand+')');
                $$("#brand").css("background-repeat", "no-repeat");
                $$("#brand").css("background-attachment", "fixed");
                $$("#brand").css("background-position", "center");
                $$("#url").attr("href", notification.url);
            }, 500
        );
        
        //alert(JSON.stringify(notification, null, 4));
    }, function(error) {
        console.error(error);
    });

    startPub(app.data.pubIsActive_API_URL, app.data.pubBrand_API_URL, app.data.pubLink_API_URL);
    //
    function startPub(pubIsActive_API_URL, pubBrand_API_URL, pubLink_API_URL){

        var pubIsActive = false, pubBrand, pubLink;

        // Request to check if starting pub is actived
        app.request.json(
            pubIsActive_API_URL, 
            function(data) {
                
                if(data){
                    pubIsActive = data.value;
                    // console.log(pubIsActive);
                    if(pubIsActive){
                        app.request.json(pubBrand_API_URL, 
                            function(data) {
                                
                                if(data){
                                    pubBrand = data.value;
                                    // console.log(pubBrand);
                                    app.request.json(pubLink_API_URL, 
                                        function(data) {
                                            
                                            if(data){
                                                pubLink = data.value;
                                                // console.log(pubLink);
                                                mainView.router.navigate('/landing-popup/');
                                                setTimeout(function(){
                                                    $$("#brand").css('background-image','url('+pubBrand+')');
                                                    $$("#brand").css('background-repeat','no-repeat');
                                                    $$("#brand").css('background-attachment','fixed');
                                                    $$("#brand").css('background-position','center');
                                                    $$("#url").attr('href', pubLink);    
                                                },500);
                                                
                                            }
                                                
                                        },
                                        function(xhr, status) {
                                            
                                        }
                                    )
                                }
                                    
                            },
                            function(xhr, status) {
                                
                            }
                        );
                    }
   
                }
                    
            },
            function(xhr, status) {
                
            }
        );
    }
}