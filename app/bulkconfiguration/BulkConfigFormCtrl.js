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
      trim: function (value) {
        return typeof value == 'string' ? value.trim() : value;
      },
      profile: function (value) {
        return ['iBeacon', 'Eddystone'].indexOf(value) > -1;
      },
      isInteger: function (value) {
        value = parseInt(value);
        return Number.isInteger(value);
      },
      proximityUuid: function (value) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(value);
      },
      namespaceId: function (value) {
        return /^[0-9a-fA-F]{20}$/.test(value);
      },
      instanceId: function (value) {
        return /^[0-9a-fA-F]{9,16}$/.test(value);
      },
      isHttpUrl: function (value) {
        return /^http:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)$/.test(value);
      },
      isItemError: function (item) {
        //check data type
        if(!validateBeacon.profile(item.profile)){
          return true;
        }
        if(!validateBeacon.isInteger(item.major)){
          return true;
        }
        if(!validateBeacon.isInteger(item.minor)){
          return true;
        }
        if(!validateBeacon.isInteger(item.interval)){
          return true;
        }
        if(!validateBeacon.isInteger(item.txPower)){
          return true;
        }
        if(!validateBeacon.proximityUuid(item.proximityUuid)){
          return true;
        }
        if(!validateBeacon.namespaceId(item.namespace)){
          return true;
        }
        if(!validateBeacon.instanceId(item.instanceId)){
          return true;
        }
        if(!validateBeacon.isHttpUrl(item.url)){
          return true;
        }
        if(!item.alias){
          return true;
        }

        //check required
        var isError = false;
        angular.forEach(item, function (value, key) {
          if(!value){
            isError = true
          }
        });

        return isError;
      }
    };


    $scope.handleRead = function (workbook) {

        $scope.workbook = workbook;
        if($scope.workbook && $scope.workbook.length){
          $scope.itemDetail.details = [];
            var beaconIds = [];

          angular.forEach($scope.workbook, function(value, key) {
            var item = {
              beaconId : validateBeacon.trim(value['Beacon ID']),
              profile: validateBeacon.trim(value['Profile']),
              major: validateBeacon.trim(value['Major']),
              minor: validateBeacon.trim(value['Minor']),
              interval: validateBeacon.trim(value['Interval']),
              txPower: validateBeacon.trim(value['TX Power']),
              proximityUuid: validateBeacon.trim(value['Proximity UUID']),
              namespace: validateBeacon.trim(value['Namspace ID']),
              instanceId: validateBeacon.trim(value['Instance ID']),
              url: validateBeacon.trim(value['URL']),
              alias: validateBeacon.trim(value['Custom Name'])
            };

            if(beaconIds.indexOf(item.beaconId) == -1) {
                beaconIds.push(item.beaconId);
                item.error = validateBeacon.isItemError(item).toString();
                $scope.itemDetail.details.push(item);
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
