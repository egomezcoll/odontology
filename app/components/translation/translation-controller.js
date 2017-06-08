(function () {
    'use strict';

    angular.module('App.translation')

    .controller('TranslationController', ['$scope', '$translate', 'tmhDynamicLocale',
        function ($scope, $translate, tmhDynamicLocale) {

            $scope.setLocale = function (locale) {
                $translate.uses(locale);
                tmhDynamicLocale.set(locale.toLowerCase());
            };

            $scope.language = {};
            $scope.language.selected = 'en-US';
            $scope.setLocale($scope.language.selected);

            $scope.languages = [{
                name: 'SPANISH',
                value: 'es-ES'
            }, {
                name: 'ENGLISH',
                value: 'en-US'
            }];

            $scope.getTranslation = function (value) {
                return $translate(value);
            };

        }
    ]);
})();
