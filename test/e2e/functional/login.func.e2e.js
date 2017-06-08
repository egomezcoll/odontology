/*jshint node:true */
/*globals expect:true */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var pagesPath = '../pages';
var LoginPage = require(pagesPath + '/login-page.js');

module.exports = function () {

    'use strict';

    this.Given(/^I am on the login page$/, function (callback) {
        new LoginPage()
            .get()
            .then(function() {
                callback();
            });
    });

    this.Then(/^I should see the header: (.*)$/, function(title, callback) {
        element.all(by.css('h1[translate="LOGIN_WELCOME"]')).then(function (item) {
            item[0].getInnerHtml().then(function (text) {
                expect(text).to.equal(title);
                callback();
            });
        });
    });

    this.When(/^I login$/, function (callback) {
        new LoginPage()
            .login('AUMMYAPP', ' ')
            .then(function () {
                callback();
            });
    });

    /* This is for testing the example-component module integration */
    /*this.Then(/^I should be on the example page$/, function (callback) {
        browser.getCurrentUrl().then(function (res) {
            expect(res).to.contain('account');
            callback();
        });
    });*/

};
