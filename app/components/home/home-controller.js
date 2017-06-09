'use strict';

angular.module('App.home')

.controller('homeController',
    function ($log, $scope, $location, $state, NgMap) {
        $log.debug('homeController loading');
        $scope.current = 0;
        $scope.greeting = 'Welcome';
        $(document).on('click','.navbar-collapse.in',function(e) {
            if( $(e.target).is('a') ) {
                $(this).collapse('hide');
            }
        });
         $scope.gotoAnchor = function(x) {
            var newHash = 'anchor' + x;
            $scope.current = x;
            $('html, body').animate({
                scrollTop: $('#'+newHash ).offset().top - 60
            }, 500);
        };

         $scope.changeCurrentTab = function(x) {
            $scope.current = x;
        };

         NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
        });

        
    });

