/*jshint node:true */
'use strict';

module.exports = function(grunt) {
    //Load all .js tasks definitions at tasks folder
    grunt.loadNpmTasks('proteo-npm-grunt-projects');
    grunt.loadTasks('./tasks');

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        configureProxies: 'grunt-connect-proxy',
        availabletasks: 'grunt-available-tasks',
        tags: 'grunt-script-link-tags',
        instrument: 'grunt-istanbul',
        jsonserver:'grunt-appverse-jsonserver',
        list: 'config/list.js'
    });

    var bowerFile = require('./bower.json');

    var options = {
        // Set path to two config directories that we want to share from
        config: {
            src: ['node_modules/proteo-npm-grunt-projects/config/*.js', 'config/*.js']
        },
        appName: require('./package.json').name,
        // Project settings
        theme: {
            custom: 'tsb-bootstrap-sass-theme' // Set default theme for the application here
        },
        literalsComponentName: '',
        paths: {
            // Configurable paths
            app: 'app',
            dist: 'dist/web',
            server: 'server',
            doc: 'doc'
        },
        ports: {
            app: 9000,
            dist: 9001,
            mockserver: 8000,
            mockserverListen: 4444,
            mockserverLivereload: 35720,
            doc: 9002,
            test: 9003,
            livereload: 35729
        },
        componentPrefix: 'proteo-',
        mockserverHost: 'localhost',
        distHost: 'localhost',
        bowerFileName: bowerFile.name,
        bowerFileVersion: bowerFile.version,
    };

    // Load grunt configurations automatically at config folder
    var configs = require('load-grunt-configs')(grunt, options);

    // Define the configuration for all the tasks
    grunt.initConfig(configs);

    grunt.registerTask('default', [
        'server'
    ]);

};
