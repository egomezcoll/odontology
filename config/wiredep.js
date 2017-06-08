/*jshint node:true */
'use strict';

module.exports = function(grunt, options){
   var componentPrefix = options.componentPrefix;
   var fs = require('fs'),  path = require('path');
   var defaultDependencies = [/notification-bar.css/,/select.min.css/,/selectize.css/,/appverse-utils.min.js/,/appverse-router.min.js/,/appverse-cache.min.js/,/appverse-logging.js/,/appverse-detection.js/,/modernizr-custom.js/,/notification-fx.js/,/appverse.notifications.min.js/,/angular-uuid.js/,/proteo.tracking-id.js/,/select.min.js/,/proteo-authorization.min.js/,/angular.js/,/angular-cache.js/,/tmhDynamicLocale.js/,/angular-translate.js/,/angular-translate-loader-static-files.js/,/angular-ui-router.js/,/classie.js/,/angular-resource.js/,/angular-filter.min.js/,/angular-ripple.js/,/jquery.js/,/bootstrap.js/,/angular-sanitize.js/,/ui-bootstrap-tpls.js/,/angular-translate-handler-log.js/];
   var myOverrides = {
     "proteo.invocation-service": {
       "main": ["dist/proteo.invocation-service.js"]
     },
     "appverse-web-html5-core": {
       "main": ["dist/appverse/appverse.min.js", "dist/appverse-utils/appverse-utils.min.js", "dist/appverse-router/appverse-router.min.js","dist/appverse-cache/appverse-cache.min.js",
       "dist/appverse-logging/appverse-logging.js", "dist/appverse-detection/appverse-detection.js", "dist/appverse-translate/appverse-translate.min.js"]
     },
     "appverse.notifications": {
       "main": ["dist/modernizr-custom.js", "dist/notification-fx.js", "dist/appverse.notifications.min.js","dist/notification-bar.css"]
     },
     "proteo.tracking-id" : {
       "main" : ["dist/angular-uuid/angular-uuid.js","dist/proteo.tracking-id.js"]
     },
     "angular-ui-select" : {
       "main" : ["dist/select.min.js","dist/select.min.css"]
     },
     "selectize" : {
       "main" : ["dist/css/selectize.css"]
     },
     'proteo-authorization': {
       'main': ['dist/web/proteo-authorization.min.js']
     },
     'proteo-audit': {
       'main': ['dist/web/audit.min.js']
     },
     'proteo-log': {
       'main': ['dist/web/log.min.js']
     }
   };
   var myExcludedFiles = [/sifter.js/,
        /microplugin.js/,
        /json3.js/,
        /sockjs.js/,
        /stomp.min.js/,
        /placeholders.js/,
        /lodash.js/,
        /restangular.js/,
        /es5-shim.js/,
        'bower_components/ionic/release/js/ionic.js',
        'bower_components/ionic/release/js/ionic-angular.js',
        'bower_components/ionic/release/css/ionic.css'
      ];
   var srcpath = 'app/bower_components';

   //getDirectories returns an array of the linked components located in the path defined above (srcpath)
   function getDirectories(srcpath, componentPrefix) {
     return fs.readdirSync(srcpath)
     .filter(function(file) {
       if (file.indexOf(componentPrefix) >= 0) {
         if(fs.existsSync(path.join(path.join(srcpath, file),'app/components'))){
           if(fs.existsSync(path.join(path.join(srcpath, file),'dist'))){
             return fs.statSync(path.join(path.join(srcpath, file),'dist')).isDirectory();
           }else{
             return fs.statSync(path.join(path.join(srcpath, file),'app/components')).isDirectory();
           }
         }
       }
     });
   }

   var proteoDep = getDirectories(srcpath, componentPrefix);
   //linked components have different main path than the distributed components
   //the next function, creates the correct path for these components
   for(var z=0; z<proteoDep.length; z++){
     var plain = proteoDep[z].split(componentPrefix)[1];
     if(fs.existsSync(path.join(path.join(srcpath, proteoDep[z]),'dist'))){
       myOverrides[proteoDep[z]] = {
         'main':['dist/web/scripts/'+proteoDep[z]+'.min.js', 'dist/web/styles/css/'+proteoDep[z]+'/'+proteoDep[z]+'.min.css']
       };
     }else{
       myOverrides[proteoDep[z]] = {
         'main':['app/styles/css/'+plain+'/'+plain+'.css','app/components/'+plain+'/'+plain+'-module.js','app/components/'+plain+'/'+plain+'-*.js','app/components/'+plain+'/templates.js']
       };
     }

   }
  return {
      task: {
         // Point to the files that should be updated when
         // you run `grunt wiredep`
         // JavaScript tags
         // <!-- bower:js -->
         // <!-- endbower -->
         // CSS Tags
         // <!-- bower:css -->
         // <!-- endbower -->
         src: [
           'app/index.html'   // .html support...
         ],

         options: {
           // See wiredep's configuration documentation for the options
           // you may pass:
           // https://github.com/taptapship/wiredep#configuration
           dependencies: true,    // default: true
           devDependencies: false, // default: false,
           exclude: myExcludedFiles,
           overrides: myOverrides
          }
        },
        portal: {
          src: [
            'app/index.html'   // .html support...
          ],

          options: {
            // See wiredep's configuration documentation for the options
            // you may pass:
            // https://github.com/taptapship/wiredep#configuration
            dependencies: true,    // default: true
            devDependencies: false, // default: false,
            exclude: myExcludedFiles.concat(defaultDependencies),
            overrides: myOverrides
           }
        },
        karma: {
           // Point to the files that should be updated when
           // you run `grunt wiredep`
           // JavaScript paths
           // // bower:js
           // // endbower
           src: [
             'test/karma-unit.conf.js'
           ],
           ignorePath:  /\.\.\//,
           fileTypes: {
              js: {
                block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                detect: {
                  js: /'(.*\.js)'/gi
                },
                replace: {
                  js: '\'{{filePath}}\','
                }
              }
            },

           options: {
             // See wiredep's configuration documentation for the options
             // you may pass:
             // https://github.com/taptapship/wiredep#configuration
             dependencies: true,    // default: true
             devDependencies: true, // default: false,
             exclude: myExcludedFiles,
             overrides: myOverrides
            }
          }
 };
};
