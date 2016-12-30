'use strict';

angular.module('app.beacon').controller('BeaconDetailCtrl', function ($scope, $interval, CalendarEvent, beaconService,$stateParams,$state) {


    $scope.getDetail = function(){
        var id = $stateParams.id;
        beaconService.get(id,function(data){
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
        beaconService.post(data,function(data){
            // Implement toaster here when create successful
            console.log("success")
            $state.go("app.beacon");
        });
    }




});