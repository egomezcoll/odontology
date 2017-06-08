/*jshint node:true */
'use strict';

module.exports = function (config) {
    config.set({
        basePath: '../',
        frameworks: ['jasmine'],

        // coverage reporter generates the coverage
        reporters: ['progress', 'coverage', 'sonarqubeUnit'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'app/components/**/*.js': 'coverage',
            'app/common/**/*.js': 'coverage',
            'app/app-states.js': 'coverage',
            'app/app.js': 'coverage'
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'lcov',
            dir: 'test/coverage/unit',
            subdir: 'lcov-report',
            includeAllSources: true
        },

        sonarQubeUnitReporter: {
            outputFile: 'test/unit/ut_report.xml',
            useBrowserName: false
        },

        browsers: ['PhantomJS'],
        autoWatch: true,

        // these are default values anyway
        singleRun: false,
        colors: true,

        files: [
            //3rd Party Code
            // bower:js
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-cache/dist/angular-cache.js',
            'app/bower_components/angular-dynamic-locale/src/tmhDynamicLocale.js',
            'app/bower_components/angular-translate/angular-translate.js',
            'app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.js',
            'app/bower_components/appverse-web-html5-core/dist/appverse/appverse.min.js',
            'app/bower_components/appverse-web-html5-core/dist/appverse-utils/appverse-utils.min.js',
            'app/bower_components/appverse-web-html5-core/dist/appverse-router/appverse-router.min.js',
            'app/bower_components/appverse-web-html5-core/dist/appverse-cache/appverse-cache.min.js',
            'app/bower_components/appverse-web-html5-core/dist/appverse-logging/appverse-logging.js',
            'app/bower_components/appverse-web-html5-core/dist/appverse-detection/appverse-detection.js',
            'app/bower_components/appverse-web-html5-core/dist/appverse-translate/appverse-translate.min.js',
            'app/bower_components/classie/classie.js',
            'app/bower_components/appverse.notifications/dist/modernizr-custom.js',
            'app/bower_components/appverse.notifications/dist/notification-fx.js',
            'app/bower_components/appverse.notifications/dist/appverse.notifications.min.js',
            'app/bower_components/proteo.tracking-id/dist/angular-uuid/angular-uuid.js',
            'app/bower_components/proteo.tracking-id/dist/proteo.tracking-id.js',
            'app/bower_components/proteo.invocation-service/dist/proteo.invocation-service.js',
            'app/bower_components/angular-ui-select/dist/select.min.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/angular-filter/dist/angular-filter.js',
            'app/bower_components/angular-ripple/angular-ripple.js',
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
            'app/bower_components/angular-sanitize/angular-sanitize.js',
            'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'app/bower_components/angular-translate-handler-log/angular-translate-handler-log.js',
            'app/bower_components/ngmap/build/scripts/ng-map.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-scenario/angular-scenario.js',
            // endbower
            'node_modules/ng-describe/dist/ng-describe.js',

            //Application code
            'app/app.js',
            'app/common/**/*-module.js',
            'app/common/**/*.js',
            'app/components/**/*-module.js',
            'app/components/**/*.js',
            'app/states/app-states.js',

            //test files
            'app/components/**/*.spec.js',
            'app/common/**/*.spec.js',
            {
                pattern: 'app/resources/**/*.*',
                watched: true,
                included: false,
                served: true,
                nocache: false
            }
        ],

        proxies: {
            '/resources/': 'http://localhost:9876/base/app/resources/'
        }
    });
};
