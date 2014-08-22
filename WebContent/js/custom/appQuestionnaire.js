define(['angular', 'jquery'], function(angular, $) {
	return angular.module('appQuestionnaire', ['resource'])
	.controller('mainCtrl', function($scope, Questionnaire, $timeout) {
		Questionnaire.query(function(data) {
			$scope.list = data;
		});
		$scope.radioChange = function(l2, l) {
			if (!l2.checked) {
				for (var i = 0; i < l.length; i++) {
					l[i].checked = false;
				}
				l2.checked = true;
			}
		}
	});
});