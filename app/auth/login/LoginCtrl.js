"use strict";

angular.module('app.auth').controller('LoginCtrl', function ($scope, $rootScope, $state, GooglePlus, User, ezfb) {

    $scope.$on('event:google-plus-signin-success', function (event, authResult) {
        if (authResult.status.method == 'PROMPT') {
            GooglePlus.getUser().then(function (user) {
                User.username = user.name;
                User.picture = user.picture;
                $state.go('app.bulkconfig');
            });
        }
    });

    $scope.$on('event:facebook-signin-success', function (event, authResult) {
        ezfb.api('/me', function (res) {
            User.username = res.name;
            User.picture = 'https://graph.facebook.com/' + res.id + '/picture';
            $state.go('app.bulkconfig');
        });
    });

    $scope.login = function(user,pass){
        if((user == 'transx' && pass == 'transx@transx')||
            (user == 'humana01' && pass == 'humana01@transx')){
            $rootScope.userLogin = true;
            console.log("user" , $rootScope.userLogin);
        }else{
            $rootScope.userLogin = false;
            console.log("user else" , $rootScope.userLogin);
        }
    }
})
