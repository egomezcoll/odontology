(function () {
    'use strict';
    //App States test2
    angular.module('App')

    .config(
        function ($urlRouterProvider, $stateProvider, $translateProvider) {
            $urlRouterProvider.otherwise(function ($injector) {
                $injector.get('$log')
                    .warn('URL ' + window.location.hash + ' did not match any state. Redirecting to /login ...');
                $injector.get('$state')
                    .go('non-existing-state');
            });
            $translateProvider.useMissingTranslationHandlerLog();
        });
}());
