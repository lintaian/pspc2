require.config({
	baseUrl: 'js',
	paths: {
		jquery: 'lib/jquery',
		jqueryMobile: 'lib/jquery.mobile-1.4.3',
		angular: 'lib/angular',
		angularResource: 'lib/angular-resource',
    	resource: 'custom/resource',
    	app: 'custom/appQuestionnaire',
    	mMain: 'custom/questionnaire'
	},
	shim: {
		angular: {
			exports: 'angular'
		},
		angularResource: {deps: ['angular']},
		jqueryMobile: {deps: ['jquery']}
	}
});
require(['jquery', 'angular', 'angularResource', 'jqueryMobile', 
         'resource', 'app', 'mMain'], function($, angular) {
	angular.bootstrap(document, ['appQuestionnaire']);
});
