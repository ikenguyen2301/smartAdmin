'use strict';

angular.module('app.bulkconfig').controller('BulkConfigCtrl', function ($scope, $interval, CalendarEvent, bulkConfigService,$state) {

    $scope.getBulkConfiguration = function(){
        bulkConfigService.getAll(function(data){
            $scope.bulklist = data.data;
        });
    };

    $scope.getBulkConfiguration();

    $scope.editBulk = function(item){
        $state.go("app.bulkconfig.detail",{id:item.objectId});
    }

    $scope.addBulk = function(){
        $state.go("app.bulkconfig.detail",{});
    }

    $scope.deleteBulk =  function (index) {
        $.SmartMessageBox({
            title: "Delete!",
            content: "Are you sure you want to delete this item?",
            buttons: '[No][Yes]'
        }, function (ButtonPressed) {
            if (ButtonPressed === "Yes") {
                bulkConfigService.delete($scope.bulklist[index].objectId, function(data){
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