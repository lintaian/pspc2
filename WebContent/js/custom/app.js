define(['angular', 'jquery'], function(angular, $) {
	return angular.module('app', ['resource'])
	.controller('mainCtrl', function($scope, Common) {
		Util.scopes.mainCtrl = $scope;
		$scope.header = {
			showDefaultTitle: function(title) {
				return RegExp('留言板-').exec(title) == null;
			}
		}
		Common.getSession({name: 'user'}, function(data) {
			$scope.user = data; 
			console.log(data);
		});
		Common.getApp({name: 'pollParam'}, function(data) {
			$scope.pollParam = data;
			console.log(data);
		});
		$scope.changePage = function(id, transition, ctrl, p1, p2, p3, p4, p5) {
			Util.scopes[ctrl].init(p1, p2, p3, p4, p5);
			$.mobile.changePage(id, {transition: transition || 'slide'});
		}
	}).controller('msgCtrl', function ($scope, Msg, $timeout) {
		Util.scopes.msgCtrl = $scope;
		var $parent = $scope.$parent;
		$scope.teachers = [{
			name: 11
		}];
		$scope.init = function() {
			Msg.getTeachers(function(data) {
				$scope.teachers = data;
			});
		}
		$scope.toChat = function(name, id) {
			Util.scopes.msgChatCtrl.init(id, '留言板-' + name);
			$.mobile.changePage('#messageBoardChat', {transition: 'slide'});
		}
	}).controller('msgChatCtrl', function ($scope, Msg, $timeout, $interval) {
		Util.scopes.msgChatCtrl = $scope;
		var $parent = $scope.$parent;
		$scope.init = function(id, name) {
			$scope.msg.tid = id;
			$scope.msg.name = name;
			$scope.msg.get(true);
			$scope.poll != null ? $interval.cancel($scope.poll) : '';
			$scope.poll = $interval(function() {
				if ($('#messageBoardChat').is(':visible')) {
					$scope.msg.get();
				} else {
					$interval.cancel($scope.poll);
				}
			}, $parent.pollParam.chat);
		}
		$scope.msg = {
			name: '',
			tid: '',
			list: [],
			text: '',
			timestamp: '',
			id: 0,
			send: function() {
				if (this.text != '') {
					Msg.save({msg: this.text, tid: this.tid, timestamp: this.timestamp, id: this.id}, function(data) {
						if (data.length > 0) {
							$scope.msg.list = $scope.msg.list.concat(data);
							$scope.msg.text = '';
							$scope.msg.timestamp = data[data.length - 1].timestamp;
							$scope.msg.id = data[data.length - 1].id;
							$timeout(function() {
								$('#chatContent').scrollIntoView('li:last');
							});
						}
					})
				}
			},
			get: function(first) {
				if (first) {
					this.timestamp = '';
					this.id = 0;
				}
				Msg.query({tid: this.tid, timestamp: this.timestamp, id: this.id}, function(data) {
					if (data.length > 0) {
						$scope.msg.list = $scope.msg.list.concat(data);
						$scope.msg.timestamp = data[data.length - 1].timestamp;
						$scope.msg.id = data[data.length - 1].id;
						$timeout(function() {
							$('#chatContent').scrollIntoView('li:last');
						});
					}
				});
			}
		}
	}).controller('statusCtrl', function($scope, Leaner, $interval) {
		Util.scopes.statusCtrl = $scope;
		var $parent = $scope.$parent;
		$scope.list = [];
		$scope.init = function() {
			$scope.getMsg();
			$scope.poll = $interval(function() {
				if ($('#studentStatus').is(':visible')) {
					$scope.getMsg();
				} else {
					$interval.cancel($scope.poll);
				}
			}, $parent.pollParam.status);
		}
		$scope.getMsg = function() {
			Leaner.getStatus(function(data) {
				$scope.list = $scope.list.concat(data);
			});
		}
	});
});