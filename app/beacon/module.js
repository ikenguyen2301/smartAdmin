'use strict';

angular.module('app.beacon', [
    'ui.router',
    'ngResource'
])

// .factory('BeaconService', function ($http, $q, APP_CONFIG) {
//     var dfd = $q.defer();
//
//     var UserModel = {
//         initialized: dfd.promise,
//         username: undefined,
//         picture: undefined
//     };
//     $http.get(APP_CONFIG.apiRootUrl + 'bulkconfiguration').then(function(response){
//         UserModel.username = response.data.username;
//         UserModel.picture= response.data.picture;
//         dfd.resolve(UserModel)
//     });
//
//     return UserModel;
// })

.config(function ($stateProvider) {
    $stateProvider
        .state('app.beacon', {
            url: '/bulkconfig',
            views: {
                "content@app": {
                    controller: 'BeaconCtrl',
                    templateUrl: 'app/beacon/beacontpl.html'
                }
            },
            data:{
                title: 'Bulk Configuration',
                requireLogin : true
            }
        })
        .state('app.beacon.detail', {
            url: '/compose?:id',
            views: {
                "content@app": {
                    templateUrl: 'app/beacon/beaconForm.html',
                    controller: 'BeaconDetailCtrl'
                }
            },
            data:{
                title: 'Bulk Configuration Detail',
                requireLogin : true
            }
        });
});
