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
		});
		$scope.changePage = function(id, transition, ctrl, p1, p2, p3, p4, p5) {
			Util.scopes[ctrl].init(p1, p2, p3, p4, p5);
			$.mobile.changePage(id, {transition: transition || 'slide'});
		}
	}).controller('msgCtrl', function ($scope, Msg, $timeout) {
		Util.scopes.msgCtrl = $scope;
		var $parent = $scope.$parent;
		$scope.teachers = [];
		$scope.init = function() {
			Msg.getTeachers(function(data) {
				$scope.teachers = data;
			});
		}
		$scope.toChat = function(name, id) {
			Util.scopes.msgChatCtrl.init(id, '留言板-' + name);
			$.mobile.changePage('#messageBoardChat', {transition: 'slide'});
		}
	}).controller('msgChatCtrl', function ($scope, Msg) {
		Util.scopes.msgChatCtrl = $scope;
		var $parent = $scope.$parent;
		$scope.init = function(id, name) {
			$scope.msg.tid = id;
			$scope.msg.name = name;
			Msg.query({id: id}, function(data) {
				$scope.msg.list = data;
			});
		}
		$scope.msg = {
			name: '',
			tid: '',
			list: [],
			text: '',
			send: function() {
				Msg.save({msg: this.text, tid: this.tid}, function(data) {
					if (data) {
						$scope.msg.list.push(data)
					}
				})
			}
		}
	});
});