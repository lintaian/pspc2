define(['jquery'], function($) {
	$(document).on('pagehide', '#dialog', function() {
		window.location.href = "main";
	});
});