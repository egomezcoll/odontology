'use strict';

// The actual grunt server settings
module.exports = {
    options: {
        port: '<%= ports.app %>',
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
    },
    livereload: {
        options: {
            open: false,
            livereload: '<%= ports.livereload %>',
            base: [
                '.tmp', '<%= paths.app %>'
            ],
            middleware: function (connect, options) {
                if (!Array.isArray(options.base)) {
                    options.base = [options.base];
                }
                // Setup the proxy
                var middlewares = [require('grunt-connect-proxy/lib/utils')
                    .proxyRequest
                ];
                // Serve static files.
                options.base.forEach(function (base) {
                    middlewares.push(connect.static(base));
                });
                // Make directory browse-able.
                var directory = options.directory || options.base[options.base.length - 1];
                middlewares.push(connect.directory(directory));
                return middlewares;
            }
        },
        proxies: [{
            context: '/api',
            host: '127.0.0.1', //zuul local or remote
            port: 8765, //zuul local port
            https: false,
            rewrite: {
                '^/api': '/'
            }
        }]

    },
    mocklivereload: {
        options: {
            open: false,
            hostname: '<%= mockserverHost %>',
            port: '<%= ports.mockserver %>',
            livereload: '<%= ports.mockserverLivereload %>',
            base: [
                '.tmp', '<%= paths.app %>'
            ],
            middleware: function (connect, options) {
                if (!Array.isArray(options.base)) {
                    options.base = [options.base];
                }
                // Setup the proxy
                var middlewares = [require('grunt-connect-proxy/lib/utils')
                    .proxyRequest
                ];
                // Serve static files.
                options.base.forEach(function (base) {
                    middlewares.push(connect.static(base));
                });
                // Make directory browse-able.
                var directory = options.directory || options.base[options.base.length - 1];
                middlewares.push(connect.directory(directory));
                middlewares.unshift(require('../grunt-helpers/proxy-table')
                    .customTable);
                return middlewares;
            }
        },
        proxies: [
        {
            context: '/config-server-bso',
            host: 'xcubosf126.bancsabadell.com',
            port: '8080',
            https: false
        }, {
            context: '/api/configserver',
            host: 'xcubosf126.bancsabadell.com', //zuul local or remote
            port: 8080, //zuul local port
            https: false,
            rewrite: {
                '^/api': '/gateway-server-bso'
            }
        },{
            context: ['/audit', '/log', '/api/loggingserver-v0/add/Channel/LogMessage'],
            host: '127.0.0.1',
            port: '<%= ports.mockserverListen %>',
            https: false,
            rewrite: {
                '^/api/loggingserver-v0/add/Channel/LogMessage': '/log',
                '^/audit': '/log'
            }
        }, {
            context: '/api',
            host: '127.0.0.1',
            port: '<%= ports.mockserverListen %>',
            https: false,
            rewrite: {
                '^/api': ''
            }
        }]
    },

    livereloadback: {
        options: {
            open: false,
            livereload: '<%= ports.livereload %>',
            base: [
                '.tmp', '<%= paths.app %>'
            ],
            middleware: function (connect) {
                if (!Array.isArray(options.base)) {
                    options.base = [options.base];
                }

                // Setup the proxy
                var middlewares = [require('grunt-connect-proxy/lib/utils')
                    .proxyRequest
                ];

                // Serve static files.
                options.base.forEach(function (base) {
                    middlewares.push(connect.static(base));
                });

                // Make directory browse-able.
                var directory = options.directory || options.base[options.base.length - 1];
                middlewares.push(connect.directory(directory));

                // middlewares.unshift(function(req, res, next) {
                //   console.log('changing method for '+req);
                //   if (req.method === 'POST') {
                //     req.method = 'GET';
                //   }
                //   return next();
                // });

                return middlewares;
            }
        },
        proxies: [{
            context: '/api',
            host: '127.0.0.1',
            port: '<%= ports.mockserverListen %>',
            https: false,
            rewrite: {
                '^/api': ''
            }
        }]

    },
    test: {
        options: {
            port: '<%= ports.test %>',
            livereload: '<%= ports.livereload %>',
            base: [
                '.tmp', 'test', 'test/coverage/instrument/app', '<%= paths.app %>'
            ],
            hostname: '0.0.0.0',
            middleware: function (connect, options) {
                if (!Array.isArray(options.base)) {
                    options.base = [options.base];
                }
                // Setup the proxy
                var middlewares = [require('grunt-connect-proxy/lib/utils')
                    .proxyRequest
                ];
                // Serve static files.
                options.base.forEach(function (base) {
                    middlewares.push(connect.static(base));
                });
                // Make directory browse-able.
                var directory = options.directory || options.base[options.base.length - 1];
                middlewares.push(connect.directory(directory));
                middlewares.unshift(require('../grunt-helpers/proxy-table')
                    .customTable);
                return middlewares;
            }
        },
        proxies: [{
            context: '/api',
            host: '127.0.0.1',
            port: '<%= ports.mockserverListen %>',
            https: false,
            rewrite: {
                '^/api': ''
            }
        }],
    },
    dist: {
        options: {
            open: false,
            port: '<%= ports.dist %>',
            base: '<%= paths.dist %>',
            livereload: false
        }
    },
    doc: {
        options: {
            port: '<%= ports.doc %>',
            base: '<%= paths.doc %>',
            livereload: false,
            keepalive: true
        }
    }

};
