define(['jquery'], function($) {
	var ScrollIntoView = function() {
		
	};
	var old = $.fn.scrollIntoView;
	$.fn.scrollIntoView = function(child) {
		return this.each(function() {
			var $this = $(this);
			var top = $this.scrollTop() + $this.find(child).offset().top + $this.find(child).height() - $this.height(); 
			$this.animate({scrollTop: top}, 0); 
		});
	};
	$.fn.scrollIntoView.Constructor = ScrollIntoView;
	$.fn.scrollIntoView.noConflict = function() {
		$.fn.scrollIntoView = old;
		return this;
	};
});