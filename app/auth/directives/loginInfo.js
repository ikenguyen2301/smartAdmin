"use strict";

angular.module('app.auth').directive('loginInfo', function($rootScope){

    return {
        restrict: 'A',
        templateUrl: 'app/auth/directives/login-info.tpl.html',
        link: function(scope, element){
            scope.user = $rootScope.userLogin;
        }
    }
})
