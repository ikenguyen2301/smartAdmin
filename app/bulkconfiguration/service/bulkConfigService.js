"use strict";

angular.module('app').factory('bulkConfigService', function($http, $log, APP_CONFIG, $rootScope) {
	function getHttpConfig() {
		var config = {
			headers: {
				'Content-Type': 'application/json',
				'username': $rootScope.userLogin.username
			}
		};

		return config;
	}

	function getAllBulkconfiguration(callback){

		$http.get(APP_CONFIG.serverUrl + 'bulkconfiguration/all', getHttpConfig()).success(function(data){
			callback(data);
		}).error(function(){
			$log.log('Error');
			callback([]);
		});
	}
	function getBulkconfigurationById(id,callback){
		$http.get(APP_CONFIG.serverUrl + 'bulkconfiguration/'+ id, getHttpConfig()).success(function(data){
			callback(data);
		}).error(function(){
			$log.log('Error');
			callback([]);
		});
	}
	function createNewBulk(data,callback){
		$http.post(APP_CONFIG.serverUrl + 'bulkconfiguration/', data, getHttpConfig()).success(function(data){
			callback(data);
		}).error(function(){
			$log.log('Error');
			callback([]);
		});
	}
	function updateBulk(data,callback){
		$http.put(APP_CONFIG.serverUrl + 'bulkconfiguration/' + data.objectId, data, getHttpConfig()).success(function(data){
			callback(data);
		}).error(function(){
			$log.log('Error');
			callback([]);
		});
	}
	function deleteBulk(objectId,callback){
		$http.delete(APP_CONFIG.serverUrl + 'bulkconfiguration/' + objectId, getHttpConfig()).success(function(data){
			callback(data);
		}).error(function(){
			$log.log('Error');
			callback(false);
		});
	}
	return {
		getAll:function(callback){
			getAllBulkconfiguration(callback);
		},
		get:function(id,callback){
			getBulkconfigurationById(id,callback);
		},
		post:function(data,callback){
			createNewBulk(data,callback);
		},
		put:function(data,callback){
			updateBulk(data,callback);
		},
		delete:function(data,callback){
			deleteBulk(data,callback);
		}
	}
});