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

    $scope.deleteBulk =  function (index) {
        $.SmartMessageBox({
            title: "Delete!",
            content: "Are you sure you want to delete this item?",
            buttons: '[No][Yes]'
        }, function (ButtonPressed) {
            if (ButtonPressed === "Yes") {
                beaconService.delete($scope.bulklist[index].objectId, function(data){
                    if(data){
                        $scope.bulklist.splice(index, 1);
                        $.smallBox({
                            title: "Deleted!",
                            content: "<i class='fa fa-clock-o'></i> <i>Bulk Configuration deleted successfully.</i>",
                            color: "#659265",
                            iconSmall: "fa fa-check fa-2x fadeInRight animated",
                            timeout: 4000
                        });
                    }
                });
            }
        });
    };
});