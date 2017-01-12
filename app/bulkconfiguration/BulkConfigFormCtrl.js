'use strict';

angular.module('app.bulkconfig').controller('BulkConfigFormCtrl', function ($scope, $interval, CalendarEvent, bulkConfigService,$stateParams,$state) {
    var url = 'http://transx.com/eddystone';

    $scope.getDetail = function(){
        $scope.id = $stateParams.id;
        bulkConfigService.get($scope.id, function(data){
            $scope.itemDetail = data.data;
            $scope.itemDetail.details = [];
        });
    };

    if(!$stateParams.id){
        $scope.itemDetail = {
          alias: 'TransX',
          details: []
        };
    }else{
        $scope.getDetail();
    }

    $scope.handleRead = function (workbook) {

        $scope.workbook = workbook;
        if($scope.workbook && $scope.workbook.length){
          $scope.itemDetail.details = [];
            var beaconIds = [];

          angular.forEach($scope.workbook, function(value, key) {
            var item = {
              beaconId : value['Beacon ID'],
              preset: '',
              profile: value['Profile'],
              major: value['Major'],
              minor: value['Minor'],
              interval: value['Interval'],
              txPower: value['TX Power'],
              proximityUuid: value['Proximity UUID'],
              namespace: value['Namspace ID'],
              instanceId: value['Instance ID'],
              url: value['URL'],
              alias: value['Custom Name']
            };
              if(beaconIds.indexOf(item.beaconId) == -1) {
                  beaconIds.push(item.beaconId);
                  if (value['Profile'] == 'iBeacon' && value['Beacon ID'] && value['Proximity UUID'] && value['Major'] && value['Minor'] && value['Interval'] && value['TX Power'] && value['Custom Name']) {
                      $scope.itemDetail.details.push(item);
                  } else if (value['Profile'] == 'Eddystone' && value['Beacon ID'] && value['Namspace ID'] && value['Instance ID'] && value['URL'] && value['Interval'] && value['TX Power'] && value['Custom Name']) {
                      $scope.itemDetail.details.push(item);
                  }
              }
          });
        } else {
           $.smallBox({
              title: "Warning",
              content: "File data have error!",
              color: "#F90",
              iconSmall: "fa fa-check fa-2x fadeInRight animated",
              timeout: 4000
          });
        }
    };

    $scope.save = function(isValid){
        if(isValid && $scope.itemDetail.details.length){
            if(!$scope.itemDetail.objectId) {
                bulkConfigService.post($scope.itemDetail, function (data) {
                    // Implement toaster here when create successful
                     $.smallBox({
                                title: "Create Notification ",
                                content: "Created successful!",
                                color: "#659265",
                                iconSmall: "fa fa-check fa-2x fadeInRight animated",
                                timeout: 4000
                            });
                    $state.go("app.bulkconfig");
                });
                } else {
                bulkConfigService.put($scope.itemDetail, function (data) {
                    // Implement toaster here when create successful
                    $.smallBox({
                                title: "Update Notification",
                                content: "Updated successful!",
                                color: "#659265",
                                iconSmall: "fa fa-check fa-2x fadeInRight animated",
                                timeout: 4000
                            });
                    $state.go("app.bulkconfig");
                });
            }
        } else if(isValid && !$scope.itemDetail.details.length){
          $.smallBox({
            title: "Error",
            content: "Select file upload",
            color: "#a90329",
            iconSmall: "fa fa-check fa-2x fadeInRight animated",
            timeout: 4000
          });
        }
    }
});
