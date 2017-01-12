"use strict";

angular.module('app.auth').controller('LoginCtrl', function ($scope, $rootScope, $state, AuthService) {
    $scope.credentials = {};
    // $scope.$on('event:google-plus-signin-success', function (event, authResult) {
    //     if (authResult.status.method == 'PROMPT') {
    //         GooglePlus.getUser().then(function (user) {
    //             User.username = user.name;
    //             User.picture = user.picture;
    //             $state.go('app.bulkconfig');
    //         });
    //     }
    // });
    //
    // $scope.$on('event:facebook-signin-success', function (event, authResult) {
    //     ezfb.api('/me', function (res) {
    //         User.username = res.name;
    //         User.picture = 'https://graph.facebook.com/' + res.id + '/picture';
    //         $state.go('app.bulkconfig');
    //     });
    // });

    $scope.login = function(loginForm){
        if(loginForm.$valid){
            $scope.isValid = AuthService.login($scope.credentials);
            if($scope.isValid){
                $rootScope.userLogin = AuthService.isAuthenticated();
                $state.go('app.bulkconfig');
            } else {
                alert('Wrong username or password.')
            }
        }
    }
})
