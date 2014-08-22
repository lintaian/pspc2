define(['angular'], function(angular) {
	return angular.module('resource', ['ngResource']).constant('cfg', {
		baseUrl: ''
	}).factory('Msg', ['$resource', 'cfg', function($resource, cfg) {
		return $resource(cfg.baseUrl + 'msg/:id',{},{
			'getTeachers': {method: 'GET', url: cfg.baseUrl + 'msg/teachers', isArray: true},
			'save': {method: 'POST', url: cfg.baseUrl + 'msg/:id', isArray: true}
		});
	}]).factory('Common', ['$resource', 'cfg', function($resource, cfg) {
		return $resource(cfg.baseUrl + 'batch/:id',{},{
			'getSession':  {method: 'GET', url: cfg.baseUrl + "session"},
			'getApp':  {method: 'GET', url: cfg.baseUrl + "application"}
		});
	}]).factory('Leaner', ['$resource', 'cfg', function($resource, cfg) {
		return $resource(cfg.baseUrl + 'leaner/:id',{},{
			'getStatus': {method: 'GET', url: cfg.baseUrl + 'leaner/status', isArray: true}
		});
	}]).factory('Questionnaire', ['$resource', 'cfg', function($resource, cfg) {
		return $resource(cfg.baseUrl + 'questionnaire/:id',{},{
//			'getStatus': {method: 'GET', url: cfg.baseUrl + 'leaner/status', isArray: true}
		});
	}]);
});
