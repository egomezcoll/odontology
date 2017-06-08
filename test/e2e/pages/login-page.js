'use strict';

var LoginPage = function() {
    var url = '#/login',
        usernameInput = element(by.model('user.username')),
        passwordInput = element(by.model('user.password')),
        submitButton = element(by.css('button[translate="FEEDS_CONTINUAR"]'));

    this.get = function() {
        return browser.get(url);
    };

    this.login = function(username, password) {
        usernameInput.sendKeys(username);
        passwordInput.sendKeys(password);

        return submitButton.click();
    };
};

module.exports = LoginPage;
