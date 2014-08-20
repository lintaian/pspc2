define(['angular'], function(angular) {
	return angular.module('resource', ['ngResource']).constant('cfg', {
		baseUrl: ''
	}).factory('Msg', ['$resource', 'cfg', function($resource, cfg) {
		return $resource(cfg.baseUrl + 'msg/:id',{},{
			'getTeachers': {method: 'GET', url: cfg.baseUrl + 'msg/teachers', isArray: true}
		});
	}]).factory('Common', ['$resource', 'cfg', function($resource, cfg) {
		return $resource(cfg.baseUrl + 'batch/:id',{},{
			'getSession':  {method: 'GET', url: cfg.baseUrl + "session"}
		});
	}]);
});
