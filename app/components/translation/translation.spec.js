(function () {
    'use strict';

    var _languagesArray = [{
        name: 'SPANISH',
        value: 'es-ES'
    }, {
        name: 'ENGLISH',
        value: 'en-US'
    }];

    ngDescribe({
        // your options
        name: 'app/components/translation/translation.spec.js',
        modules: 'App.translation',
        controllers: 'TranslationController',
        inject: ['$translate', 'tmhDynamicLocale'],
        tests: function (deps) {

            it('should have a language.selected default value of en-US', function () {
                var scope = deps.TranslationController;

                expect(scope.language.selected).toEqual('en-US');
            });



            it('should call the $translate.uses method when setLocale is called', function () {
                var scope = deps.TranslationController;

                spyOn(deps.$translate, 'uses');
                spyOn(deps.tmhDynamicLocale, 'set');

                scope.setLocale('en-US');
                expect(deps.$translate.uses).toHaveBeenCalled();
                expect(deps.tmhDynamicLocale.set).toHaveBeenCalled();
            });



            it('should have a languages array ', function () {
                var scope = deps.TranslationController;

                expect(scope.languages).toEqual(_languagesArray);
            });
        }
    });
})();
