

'use strict';

angular.module('app.auth').factory('AuthService', function ($http, $window) {
    var authService = {};

    authService.login = function (credentials) {
        var users = [
                {
                    username: 'transx',
                    pass: 'transx@transx',
                    name: 'TransX',
                    picture: 'styles/img/avatars/sunny.png'
                },
                {
                    username: 'humana01',
                    pass: 'humana01@transx',
                    name: 'TransX',
                    picture: 'styles/img/avatars/4.png'
                }
            ],
            isValid = false;

        angular.forEach(users, function(user, key) {
            if(user.username == credentials.username && user.pass == credentials.pass){
                $window.sessionStorage["userInfo"] = JSON.stringify(user);
                isValid = true;
            }
        });
        return isValid;
    };

    authService.logout = function (credentials) {
        $window.sessionStorage["userInfo"] = null;

        return true;
    };

    authService.isAuthenticated = function () {
        if ($window.sessionStorage["userInfo"]) {
            return JSON.parse($window.sessionStorage["userInfo"]);
        }
        return false;
    };

    return authService;
})