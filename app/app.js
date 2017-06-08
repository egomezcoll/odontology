(function() {
    'use strict';
    //Angular module for test2
    var myApplication = angular.module('App', [
        'App.translation',
        'App.home',
        'ngMap'
    ])
        .run(function($log, $rootScope, $state, $http, $filter, Notification) {
            $log.debug('test2 App run');
            $http.get('resources/static-data/ISOcodes.json')
                //$http.get('/api/ISOcodes')
                .then(function(response) {
                    response = response.data;
                    var lang = window.navigator.languages ? window.navigator.languages[0] : null;
                    lang = lang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage;
                    if (lang.indexOf('-') !== -1) {
                        lang = lang.split('-')[0];
                    }
                    if (lang.indexOf('_') !== -1) {
                        lang = lang.split('_')[0];
                    }
                    var country = $filter('filter')(response, {
                        'ISO3166-1-Alpha-2': lang.toUpperCase()
                    })[0]['ISO3166-1-Alpha-3'];

                    $rootScope.language = {
                        'lang': lang.toUpperCase(),
                        'country': country
                    };
                });
           
            $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState) {
                event.preventDefault();
                var type = 'location';
                if (unfoundState.to !== 'non-existing-state') {
                    type = 'state';
                    $log.warn(unfoundState.to + 'state does not exist. This action comes from state ' + fromState.name);
                }
                if (window.location.hash.length > 0) {
                    Notification.show({
                        type: 'error',
                        text: 'Invalid ' + type + '. Redirecting...'
                    });
                }
                $state.go('home');
            });
            $rootScope.viewportHeight = function() {
                $('div[ui-view]')
                    .css('min-height', 'calc(100% - 121px)');
                $('.mainview')
                    .css('min-height', 'calc(100% - 121px)');
            };
        });
    function deepen(o) {
        var oo = {}, t, parts, part;
        for (var k in o) {
            if (!o.hasOwnProperty[k]) {
                return;
            }
            t = oo;
            parts = k.split('.');
            var key = parts.pop();
            while (parts.length) {
                part = parts.shift();
                t = t[part] = t[part] || {};
            }
            t[key] = o[k]
        }
        return oo;
    }

    function getRemoteServerData(url, appId, failFast, promise, config){
        var $http = angular.injector(['ng']).get('$http');
        function errorHandler(err) {
            if (!failFast) {
                return promise.reject(err || 'Wrong profile');
            } else {
                return promise.resolve(myApplication.constant('CONFIG_SERVER', ''));
            }
        }
        $http.get(url)
            .then(function (response) {
                if (response.data.name !== appId) { return errorHandler(); }                
                if (config.REMOTE_CONFIG.merge) {
                    var merged = {};
                    angular.merge(merged, config, response.data);
                    promise.resolve({ environment: merged });
                }
                promise.resolve({ environment: response.data });
            })
            .catch(errorHandler);
    }

    function fetchData() {
        var initInjector = angular.injector(['ng']);
        var $http = initInjector.get('$http');
        var $q = initInjector.get('$q');
        var promise = $q.defer();
        

        function heartBeat(appConfig) {
            if (!appConfig.HEART_BEAT){
                var deferred = $q.defer();
                deferred.resolve();
                return deferred.promise;
            }
            return $http.get('api/heart-info')
                .then(function (response) {
                    var info = response.data;
                    console.log(info)
                    myApplication.constant('HEART_BEAT', info);
                })
                .catch(function (err) {
                    console.warn('Problem with heart-beat service:', err);
                });
        }

        $http.get('resources/configuration/environment-conf.json')
            .then(function (response) {
                var config = response.data,
                    appConfig = config.APP_CONFIG,
                    remoteConfig = config.REMOTE_CONFIG;

                if (!(remoteConfig && remoteConfig.enabled)) {
                    return heartBeat(appConfig)
                    .then(function(){
                        return promise.resolve(myApplication.constant('CONFIG_SERVER', ''));
                    });
                }

                var url = remoteConfig.url + '/' + remoteConfig.environment + '/spa-' + appConfig.APP_ID + '.json';
                return heartBeat(appConfig)
                    .then(function(){
                        return getRemoteServerData(url, appConfig.APP_ID, remoteConfig.failFast, promise, config)
                    });

            })
            .catch(function (err) {
                throw new Error('Invalid Config: ' + err);
            });

        return promise.promise;
    }

    function bootstrapApplication(config) {
        angular.element(document).ready(function() {
            AppInit.setConfig(config);
            angular.bootstrap(document, ['App']);
        });
    }

    fetchData()
        .then(bootstrapApplication,
        function (err) {
            console.log("Error " + JSON.stringify(err));
            var initInjector = angular.injector(['ng']);
            var $window = initInjector.get('$window');
            $window.location.href = '/404.html';
        });

    angular.module('App')
        .animation('.fade-in', function() {
            return {
                enter: function(element, done) {
                    element.css({
                        opacity: 0
                    })
                        .animate({
                            opacity: 1
                        }, 700, done);
                }
            };
        });
} ());
