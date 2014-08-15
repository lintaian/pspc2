define(['jquery'], function($) {
	$(document).on('pageinit', '#mainPage', function() {
		$('[data-custom="logout"]').on('tap', function() {
			$(this).next().toggle();
		});
	});
})