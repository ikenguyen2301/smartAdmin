'use strict';

angular.module('app.beacon').controller('BeaconDetailCtrl', function ($scope, $interval, CalendarEvent, beaconService,$stateParams,$state) {
    var url = 'http://transx.com/eddystone';

    $scope.getDetail = function(){
        $scope.id = $stateParams.id;
        beaconService.get($scope.id, function(data){
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
                beaconService.post(data, function (data) {
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
                beaconService.put(data, function (data) {
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
