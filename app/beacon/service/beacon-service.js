"use strict";

angular.module('app').factory('beaconService', function($http, $log, APP_CONFIG) {
	function getAllBulkconfiguration(callback){
		var config = {
			headers: {
				'username': 'transx',
				'Content-Type': 'application/json'
			}
		};
		$http.get(APP_CONFIG.serverUrl + 'bulkconfiguration/all',config).success(function(data){
			callback(data);
		}).error(function(){
			$log.log('Error');
			callback([]);
		});
	}
	function getBulkconfigurationById(id,callback){
		var config = {
			headers: {
				'username': 'transx',
				'Content-Type': 'application/json'
			}
		};
		$http.get(APP_CONFIG.serverUrl + 'bulkconfiguration/'+ id, config).success(function(data){
			callback(data);
		}).error(function(){
			$log.log('Error');
			callback([]);
		});
	}
	function createNewBulk(data,callback){
		var config = {
			headers: {
				'username': 'transx',
				'Content-Type': 'application/json'
			}
		};
		$http.post(APP_CONFIG.serverUrl + 'bulkconfiguration/', data, config).success(function(data){
			callback(data);
		}).error(function(){
			$log.log('Error');
			callback([]);
		});
	}
	function updateBulk(data,callback){
		var config = {
			headers: {
				'username': 'transx',
				'Content-Type': 'application/json'
			}
		};
		$http.put(APP_CONFIG.serverUrl + 'bulkconfiguration/' + data.objectId, data, config).success(function(data){
			callback(data);
		}).error(function(){
			$log.log('Error');
			callback([]);
		});
	}
	function deleteBulk(objectId,callback){
		var config = {
			headers: {
				'username': 'transx',
				'Content-Type': 'application/json'
			}
		};
		$http.delete(APP_CONFIG.serverUrl + 'bulkconfiguration/' + objectId, config).success(function(data){
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