(function () {
    'use strict';

    angular.module('App.translation')

    .controller('TranslationController', ['$scope', '$translate', 'tmhDynamicLocale',
        function ($scope, $translate, tmhDynamicLocale) {
            console.log('TRANSLATION RUN');
            $scope.setLocale = function (locale) {
                if(locale==='en-US'){
                    $scope.langSelected = 'eng';
                }else if(locale==='ca-ES'){
                    $scope.langSelected = 'cat';
                }else{
                    $scope.langSelected = 'es';
                }
                $translate.uses(locale);
                tmhDynamicLocale.set(locale.toLowerCase());
            };

            $scope.language = {};
            $scope.language.selected = 'es-ES';
            $scope.langSelected = 'es';
            $scope.setLocale($scope.language.selected);

            $scope.languages = [{
                name: 'SPANISH',
                value: 'es-ES'
            }, {
                name: 'ENGLISH',
                value: 'en-US'
            }, {
                name: 'CATALAN',
                value: 'ca-ES'
            }];

            $scope.getTranslation = function (value) {
                return $translate(value);
            };

        }
    ]);
})();
