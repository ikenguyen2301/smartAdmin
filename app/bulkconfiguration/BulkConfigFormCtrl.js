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

    var validateBeacon = {
      isInteger: function (value) {
        value = parseInt(value);
        return Number.isInteger(value) ? value : null;
      },
      proximityUuid: function (value) {
        if(!value){
          return null;
        }

        value = value.trim();
        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value)) {
          return value;
        }

        return null;
      },
      namespaceId: function (value) {
        if(!value){
          return null;
        }

        value = value.trim();
        if (/^[0-9a-fA-F]{20}$/.test(value)) {
          return value;
        }

        return null;
      },
      instanceId: function (value) {
        if(!value){
          return null;
        }

        value = value.trim();
        if (/^[0-9a-fA-F]{9,16}$/.test(value)) {
          return value;
        }

        return null;
      },
      isHttpUrl: function (value) {
        if(!value){
          return null;
        }

        value = value.trim();
        if (/^http:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)$/.test(value)) {
          return value;
        }

        return null;
      }
    };


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
              major: validateBeacon.isInteger(value['Major']),
              minor: validateBeacon.isInteger(value['Minor']),
              interval: validateBeacon.isInteger(value['Interval']),
              txPower: validateBeacon.isInteger(value['TX Power']),
              proximityUuid: validateBeacon.proximityUuid(value['Proximity UUID']),
              namespace: validateBeacon.namespaceId(value['Namspace ID']),
              instanceId: validateBeacon.instanceId(value['Instance ID']),
              url: validateBeacon.isHttpUrl(value['URL']),
              alias: value['Custom Name']
            };

            if(beaconIds.indexOf(item.beaconId) == -1) {
                beaconIds.push(item.beaconId);
                if (item.profile == 'iBeacon' && item.beaconId && item.proximityUuid && item.major && item.minor && item.interval && item.txPower && item.alias) {
                    $scope.itemDetail.details.push(item);
                } else if (item.profile == 'Eddystone' && item.beaconId && item.namespace && item.instanceId && item.url && item.interval && item.txPower && item.alias) {
                    $scope.itemDetail.details.push(item);
                }
            }
          });

          console.log('$scope.itemDetail.details', $scope.itemDetail.details);
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
