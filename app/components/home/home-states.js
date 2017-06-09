
(function () {
    'use strict';

    angular.module('App.home')

    .config(
        function ($stateProvider) {

            // We must configure states using $stateProvider.
            $stateProvider
                .state('home', {
                    // Use a url of "/" to set a state as the "index".
                    url: '/home',
                    templateUrl: 'components/home/home.html'
                });
        }
    );
}());