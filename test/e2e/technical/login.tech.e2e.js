/*jshint node:true */
'use strict';

describe('E2E: Testing login view', function () {

    beforeAll(function () {
        browser.setLocation('login');
    });

    it('should have a working /login route', function () {
        expect(browser.getLocationAbsUrl()).toBe('/login');
    });

    it('should have a greeting title', function () {
        element.all(by.css('h1[translate="LOGIN_WELCOME"]')).then(function (item) {
            item[0].getInnerHtml().then(function (text) {
                expect(text).toEqual('Welcome to Internet Banking');
            });
        });
    });

});
