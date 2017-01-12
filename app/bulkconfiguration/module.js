'use strict';

angular.module('app.bulkconfig', [
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
        .state('app.bulkconfig', {
            url: '/bulkconfig',
            views: {
                "content@app": {
                    controller: 'BulkConfigCtrl',
                    templateUrl: 'app/bulkconfiguration/bulkconfigtpl.html'
                }
            },
            data:{
                title: 'Bulk Configuration',
                requireLogin : true
            }
        })
        .state('app.bulkconfig.form', {
            url: '/compose?:id',
            views: {
                "content@app": {
                    templateUrl: 'app/bulkconfiguration/bulkConfigForm.html',
                    controller: 'BulkConfigFormCtrl'
                }
            },
            data:{
                title: 'Bulk Configuration Detail',
                requireLogin : true
            }
        })
        .state('app.bulkconfig.detail', {
            url: '/:id',
            views: {
                "content@app": {
                    templateUrl: 'app/bulkconfiguration/bulkConfigDetail.html',
                    controller: 'BulkConfigDetailCtrl'
                }
            },
            data:{
                title: 'Bulk Configuration Detail',
                requireLogin : true
            }
        });
});
