define(['angular', 'jquery'], function(angular, $) {
	return angular.module('appQuestionnaire', ['resource'])
	.controller('mainCtrl', function($scope, Questionnaire, $timeout) {
		Questionnaire.get(function(rs) {
			var data = rs.list;
			for (var i = 0; i < data.length; i++) {
				var options = [];
				for (var j = 0; j < data[i].options.length; j++) {
					options.push({
						name: data[i].options[j],
						value: num2Char(j + 1)
					})
				}
				data[i].options = options;
			}
			$scope.list = data;
			$scope.record = rs.record;
		});
		$scope.radioChange = function(l2, l) {
			if (!l2.checked) {
				for (var i = 0; i < l.length; i++) {
					l[i].checked = false;
				}
				l2.checked = true;
			}
		}
		$scope.commit = function() {
			var data = $scope.list;
			var temp = true;
			for (var i = 0; i < data.length; i++) {
				var flag = false;
				for (var j = 0; j < data[i].options.length; j++) {
					if (data[i].options[j].checked) {
						flag = true;
						break;
					} 
				}
				if (!flag) {
					temp = false;
					break;
				}
			}
			if (temp) {
				var rs = '';
				for (var i = 0; i < data.length; i++) {
					for (var j = 0; j < data[i].options.length; j++) {
						if (data[i].options[j].checked) {
							rs += data[i].options[j].value;
						}
					}
					if (i != data.length - 1) {
						rs += ',';
					}
				}
				Questionnaire.save({result: rs, surveyUid: $scope.record.surveyUid}, function(data) {
					if (data) {
						$.mobile.changePage('#dialog', {transition: 'slide', role: 'dialog'});
					}
				});
			} else {
				alert('请完成问卷调查,谢谢!');
			}
		}
		function num2Char(num) {
			var rs = '';
			switch (num) {
			case 1: rs = 'A';break;
			case 2: rs = 'B';break;
			case 3: rs = 'C';break;
			case 4: rs = 'D';break;
			case 5: rs = 'E';break;
			case 6: rs = 'F';break;
			case 7: rs = 'G';break;
			case 8: rs = 'H';break;
			case 9: rs = 'I';break;
			case 10: rs = 'J';break;
			case 11: rs = 'K';break;
			case 12: rs = 'L';break;
			case 13: rs = 'M';break;
			case 14: rs = 'N';break;
			case 15: rs = 'O';break;
			case 16: rs = 'P';break;
			case 17: rs = 'Q';break;
			case 18: rs = 'R';break;
			case 19: rs = 'S';break;
			case 20: rs = 'T';break;
			case 21: rs = 'U';break;
			case 22: rs = 'V';break;
			case 23: rs = 'W';break;
			case 24: rs = 'X';break;
			case 25: rs = 'Y';break;
			case 26: rs = 'Z';break;
			default:
				break;
			}
			return rs;
		}
	});
});