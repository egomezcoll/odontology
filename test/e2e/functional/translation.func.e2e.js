/*jshint node:true */
/*globals expect:true */

var chai = require('chai');
var expect = chai.expect;
var pagesPath = '../pages';
var LoginPage = require(pagesPath + '/login-page.js');
var CommonPage = require(pagesPath + '/common-page.js');

module.exports = function () {

    'use strict';

    this.Given(/^I am on any page$/, function (callback) {
        new LoginPage()
            .get()
            .then(callback);
    });

    this.When(/^I select the option (.*)$/, function (locale, callback) {
        new CommonPage()
            .uiSelectItem('language.selected', locale)
            .then(callback);
    });

    this.Then(/^the title should be translated to (.*)$/, function(locale, callback) {
        element.all(by.css('h1[translate="LOGIN_WELCOME"]')).then(function (item) {
            item[0].getInnerHtml().then(function (text) {
                expect(text).to.equal(locale);
                callback();
            });
        });
    });

};
