'use strict';

angular.module('app.beacon').controller('BeaconCtrl', function ($scope, $interval, CalendarEvent, beaconService,$state) {

    $scope.getBulkConfiguration = function(){
        beaconService.getAll(function(data){
            $scope.bulklist = data.data;
        });
    };

    $scope.getBulkConfiguration();

    $scope.editBulk = function(item){
        console.log("Item",item);
        $state.go("app.beacon.detail",{id:item.objectId});
    }

    $scope.addBulk = function(){
        console.log("Item create");
        $state.go("app.beacon.detail",{});
    }

});