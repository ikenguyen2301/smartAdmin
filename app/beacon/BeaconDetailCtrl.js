'use strict';

angular.module('app.beacon').controller('BeaconDetailCtrl', function ($scope, $interval, CalendarEvent, beaconService,$stateParams,$state) {


    $scope.getDetail = function(){
        $scope.id = $stateParams.id;
        beaconService.get($scope.id, function(data){
            $scope.itemDetail = data.data;
            console.log("scope.itemDetail",$scope.itemDetail);
        });
    };

    if(!$stateParams.id){
        $scope.itemDetail ={};
    }else{
        $scope.getDetail();
    }

    $scope.save = function(data){
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
    }
});