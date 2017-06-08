/*jshint node:true */
'use strict';

var waitPlugin = require('./waitPlugin');
var istanbul = require('istanbul');
var collector = new istanbul.Collector();

exports.config = {
    seleniumArgs: [
        '-Dwebdriver.ie.driver=node_modules/protractor/selenium/IEDriverServer.exe',
        '-browserTimeout=60'
    ],
    specs: [
        'e2e/init.js',
        'e2e/technical/*.tech.e2e.js'
    ],
    allScriptsTimeout: 60000,
    getPageTimeout: 20000,
    baseUrl: 'http://localhost:9003',
    framework: 'jasmine2',
    multiCapabilities: [
        /*{
            browserName: 'phantomjs',
            'phantomjs.binary.path': require('phantomjs').path,
            'phantomjs.cli.args': ['--ignore-ssl-errors=true', '--web-security=false'],
        }*/
        {
            browserName: 'chrome'
            // ,chromeOptions: {  //discomment to open e2e tests using mobile user agent
            //     'args': ['user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A405 Safari/600.1.4']
            // }
        }
        //        , {
        //            browserName: 'firefox'
        //        }, {
        //            browserName: 'internet explorer'
        //        }
    ],
    plugins: [{
        path: './waitPlugin.js'
    }],
    onPrepare: function () {
        browser.driver.manage().window().setSize(1280, 1024);
        var jasmineReporters = require('jasmine-reporters');
        var capsPromise = browser.getCapabilities();

        var jasmineEnv = jasmine.getEnv();

        capsPromise.then(function (caps) {
            var browserName = caps.get('browserName').toUpperCase();
            var browserVersion = caps.get('version');
            var prePendStr = browserName + '-' + browserVersion + '-junit';
            jasmineEnv.addReporter(new jasmineReporters.JUnitXmlReporter({
                savePath: 'reports/e2e',
                filePrefix: prePendStr
            }));
        });

        return capsPromise;
    },
    onComplete: function () {

        browser.driver.executeScript('return __coverage__;')
            .then(function (coverageResults) {
                collector.add(coverageResults);

                istanbul.Report
                    .create('lcov', {
                        dir: 'reports/e2e/coverage'
                    })
                    .writeReport(collector, true);

                waitPlugin.resolve();
            });
    },
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
