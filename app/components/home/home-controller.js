'use strict';

angular.module('App.home')

.controller('homeController',
    function ($log, $scope, $location, $state, NgMap, serviceInvocation, $http, homeFactory, $timeout) {
        $log.debug('homeController loading');
        $scope.current = 0;
        $scope.noticias = [];
        $scope.greeting = 'Welcome';
        $scope.token = null;
        var hashmap = [];



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

//oauth/access_token?grant_type=client_credentials&client_id=372246153177463&client_secret=0d360daa0d52ab402d3314fe3a4d3b45

        serviceInvocation.callService('/oauth/access_token?grant_type=client_credentials&client_id=372246153177463&client_secret=0d360daa0d52ab402d3314fe3a4d3b45', {}, 'GET')
            .then(function(data){
                    $scope.token = data.access_token;
                     serviceInvocation.callService('/652486961617718/posts?access_token='+$scope.token,{},'GET')
                        .then(function(response){
                            $scope.news = response.data;
                            $scope.news.forEach(function(item, index){
                            $scope.getFBPicture(item.id, index, $scope.token);
                            if(index === $scope.news.length -1){
                                $timeout(function(){
                                    $scope.noticias = angular.copy($scope.news);
                                },3000);
                            }
                            });
                            console.log($scope.news);
                        }, function(error){
                            console.log(error);
                        });
            });



        $scope.getFBPicture = function(id, index, token){
               homeFactory.call(id, token).then(function(response){
                    $scope.news[index].foto = response.data.data.url;
                    $scope.aux = $scope.news[index].created_time.split("T")[0];
                    $scope.auxF = $scope.aux.split("-");
                    $scope.news[index].fecha = $scope.auxF[2] + "-" + $scope.auxF[1] + "-" + $scope.auxF[0];
                },function(error){
                    $scope.news[index].foto = false;
                    $scope.aux = $scope.news[index].created_time.split("T")[0];
                    $scope.auxF = $scope.aux.split("-");
                    $scope.news[index].fecha = $scope.auxF[2] + "-" + $scope.auxF[1] + "-" + $scope.auxF[0];
                });

        };

    }).factory('homeFactory',
        ["$http","$q", function ($http, $q) {

            var factory = {};

            factory.call = function (id, token) {
                 var deferredPetition = $q.defer();
                 $http.get('https://graph.facebook.com/'+id+'?fields=object_id&access_token='+token)
                    .then(function(response){
                        if(response.data.object_id){
                            console.log(response.data.object_id);
                            $http.get('https://graph.facebook.com/v2.9/'+response.data.object_id+'/picture?redirect=false&access_token='+token)
                                    .then(function(resp){
                                        console.log(resp);
                                        deferredPetition.resolve(resp);
                            });
                        }
                        else{
                            deferredPetition.reject('error');
                        }
                }, function(error){
                    console.log(error);
                    deferredPetition.reject('error');
                });
                return deferredPetition.promise;
            };

            return factory;

        }]);
