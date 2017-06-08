/*jshint node:true */
'use strict';
var pagesPath = '../pages';
var CommonPage = require(pagesPath + '/common-page.js');

describe('E2E: Testing translate', function () {
    var greeting = element.all(by.css('h1[translate="LOGIN_WELCOME"]'));

    beforeAll(function () {
        browser.setLocation('login');
    });

    it('should set the language to Spanish', function() {
        new CommonPage()
            .uiSelectItem('language.selected', 'Spanish')
            .then(function(res) {
                greeting.then(function (item) {
                    item[0].getInnerHtml().then(function (text) {
                        expect(text).toEqual('Bienvenido a Internet Banking');
                    });
                });
            });
    });

    it('should set the language to English', function() {
        new CommonPage()
            .uiSelectItem('language.selected', 'English')
            .then(function(res) {
                greeting.then(function (item) {
                    item[0].getInnerHtml().then(function (text) {
                        expect(text).toEqual('Welcome to Internet Banking');
                    });
                });
            });
    });

});
