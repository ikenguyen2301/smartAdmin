'use strict';

angular.module('app.bulkconfig').controller('BulkConfigDetailCtrl', function ($scope, $interval, CalendarEvent, bulkConfigService,$state, $stateParams) {

    $scope.filterBy = 'all';

    $scope.getDetail = function(){
        $scope.id = $stateParams.id;
        bulkConfigService.get($scope.id, function(data){
            $scope.itemDetail = data.data;
        });
    };

    $scope.itemFilter = function (item) {
        if($scope.filterBy == 'all'){
            return true;
        }
        return item.error == $scope.filterBy;
    };

    $scope.changeFilter = function (type) {
        $scope.filterBy = type;
    };

    $scope.getDetail();

    $scope.editBulk = function(){
        $state.go("app.bulkconfig.form",{id: $scope.itemDetail.objectId});
    }
    $scope.back = function(){
        $state.go("app.bulkconfig");
    }

    $scope.deleteBulk =  function () {
        $.SmartMessageBox({
            title: "Delete!",
            content: "Are you sure to delete this item?",
            buttons: '[No][Yes]'
        }, function (ButtonPressed) {
            if (ButtonPressed === "Yes") {
                bulkConfigService.delete($scope.itemDetail.objectId, function(data){
                    if(data){
                        $.smallBox({
                            title: "Deleted!",
                            content: "<i class='fa fa-clock-o'></i> <i>Bulk Configuration deleted successfully.</i>",
                            color: "#659265",
                            iconSmall: "fa fa-check fa-2x fadeInRight animated",
                            timeout: 4000
                        });
                        $state.go("app.bulkconfig");
                    }
                });
            }
        });
    };
});