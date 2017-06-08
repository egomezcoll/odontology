'use strict';

var CommonPage = function() {

    this.uiSelectItem = function (ngmodel, option) {
        var select = element(by.model(ngmodel)),
            searchBox = select.element(by.css('.ui-select-search'));

        select.click();
        searchBox.sendKeys(option);
        return element.all(by.css('.ui-select-choices-row-inner span'))
            .first()
            .click();
    };
};

module.exports = CommonPage;
