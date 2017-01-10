'use strict';

angular.module('app.bulkconfig').controller('BulkConfigDetailCtrl', function ($scope, $interval, CalendarEvent, bulkConfigService,$stateParams,$state) {
    var url = 'http://transx.com/eddystone';

    $scope.getDetail = function(){
        $scope.id = $stateParams.id;
        bulkConfigService.get($scope.id, function(data){
            $scope.itemDetail = data.data;
            if(!$scope.itemDetail.url){
              $scope.itemDetail.url = url;
            }
            console.log("scope.itemDetail",$scope.itemDetail);
        });
    };

    if(!$stateParams.id){
        $scope.itemDetail ={"url":url,"firmware":"4.1","profile" : 'iBeacon',"alias": 'TransX'};
    }else{
        $scope.getDetail();
    }

    $scope.save = function(data, isValid){
        if(isValid){
            if(!data.objectId) {
                bulkConfigService.post(data, function (data) {
                    // Implement toaster here when create successful
                     $.smallBox({
                                title: "Create Notification ",
                                content: "Created successful!",
                                color: "#659265",
                                iconSmall: "fa fa-check fa-2x fadeInRight animated",
                                timeout: 4000
                            });
                    $state.go("app.beacon");
                });
                } else {
                bulkConfigService.put(data, function (data) {
                    // Implement toaster here when create successful
                    $.smallBox({
                                title: "Update Notification",
                                content: "Updated successful!",
                                color: "#659265",
                                iconSmall: "fa fa-check fa-2x fadeInRight animated",
                                timeout: 4000
                            });
                    $state.go("app.beacon");
                });
            }
        }else{
            //  $.smallBox({
            //     title: "Error ",
            //     content: "Form have error !",
            //     color: "#659265",
            //     iconSmall: "fa fa-check fa-2x fadeInRight animated",
            //     timeout: 4000
            // });
        }
        
    }
});
