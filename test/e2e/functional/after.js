module.exports = function() {
    'use strict';

    this.After(function(callback) {
        if (browser.getProcessedConfig().value_.capabilities.browserName !== 'internet explorer') {

            browser.driver.executeScript('return __coverage__;').then(function(coverageResults) {
                browser.collector.add(coverageResults);
                callback();
            });
        } else {
            callback();
        }
    });
}
