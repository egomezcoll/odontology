/*jshint node:true */
'use strict';

var istanbul = require('istanbul');
var fs = require('fs');

exports.config = {
    seleniumArgs: [
        '-Dwebdriver.ie.driver=node_modules/protractor/selenium/IEDriverServer.exe',
        '-browserTimeout=60'
    ],
    specs: [
        'e2e/functional/*.feature'
    ],
    allScriptsTimeout: 60000,
    getPageTimeout: 20000,
    baseUrl: 'http://localhost:9003',
 	framework: 'custom',
 	frameworkPath: require.resolve('protractor-cucumber-framework'),
	cucumberOpts: {
	    require: 'e2e/functional/*.func.e2e.js',
	    tags: false,
	    format: 'pretty',
	    profile: false,
	    'no-source': true
	},
    resultJsonOutputFile: 'reports/e2e/cucumber-results.json',
    multiCapabilities: [
        // {
        //     browserName: 'phantomjs',
        //     'phantomjs.binary.path': require('phantomjs').path,
        //     'phantomjs.cli.args': ['--ignore-ssl-errors=true', '--web-security=false'],
        // },
        {
            browserName: 'chrome'
            // ,chromeOptions: {  //discomment to open e2e tests using mobile user agent
            //     'args': ['user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 8_0_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A405 Safari/600.1.4']
            // }
        },
        // {
        //     browserName: 'firefox'
        // },
        // { Not working on Mac OSX (at least) due to problem installing SafariDriver
        //     browserName: 'safari'
        // },
        // {
        //     browserName: 'internet explorer'
        // }
    ],
    onPrepare: function() {
        browser.driver.manage().window().setSize(1280, 1024);
        browser.collector = new istanbul.Collector();
        if (!fs.existsSync('reports')) {
            fs.mkdirSync('reports');
        }
        if (!fs.existsSync('reports/e2e')) {
            fs.mkdirSync('reports/e2e');
        }
    },
    onComplete: function() {

        var browserName = browser.getProcessedConfig().value_.capabilities.browserName;
        if (browserName === 'internet explorer') {
            return;
        }

        istanbul.Report
            .create('lcov', {
                dir: 'reports/e2e/coverage/' + browserName
            })
            .writeReport(browser.collector, true);
    },
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000
    }
};
