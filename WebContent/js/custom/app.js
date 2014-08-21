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
			$scope.msg.get();
			$scope.poll = $interval(function() {
				if ($('#messageBoardChat').is(':visible')) {
					$scope.msg.get();
				} else {
					$interval.cancel($scope.poll);
					console.log('stoped');
				}
			}, $parent.pollParam.chat);
		}
		$scope.msg = {
			name: '',
			tid: '',
			list: [],
			text: '',
			timestamp: '',
			send: function() {
				if (this.text != '') {
					Msg.save({msg: this.text, tid: this.tid}, function(data) {
						if (data) {
							$scope.msg.text = '';
							$scope.msg.list.push({
								senderName: 'test',
								senderUid: 'dd',
								info: '呵呵',
								timestamp: data.timestamp
							});
							$timeout(function() {
								$('#chatContent').scrollIntoView('li:last');
							});
						}
					})
				}
			},
			get: function() {
				Msg.query({id: this.tid, timestamp: this.timestamp}, function(data) {
					console.log(data);
					if (data.length > 0) {
						$scope.msg.list = $scope.msg.list.concat(data);
						$scope.msg.timestamp = data[data.length - 1].timestamp;
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