define([ 'jquery', 'echarts' ], function(jquery, echarts) {
	(function($, echarts) {
		var Util = function() {

		};
		Util.chartIds = [];
		Util.scopes = {};
		Util.resizeChart = function() {
//			alert(window.orientation);
//			for ( var i=0; i < Util.chartIds.length; i++) {
//				var id = Util.chartIds[i];
//				if ($('#' + id).data('echart')) {
//					if(window.orientation == 0) {
//						Util.resizeDiv(id);
//					} else {
//						Util.resizeDiv(id, 1.0, 0.9);
//					}
//					$('#' + id).data('echart').resize();
//					$('#' + id).data('echart').refresh();
//				}
//			}
		}
		Util.getOption = function(config) {
			var series = [], boundaryGap;
			for (var i = 0; i < config.series.length; i++) {
				var s = config.series[i];
				var t = {
					name: s.name,
		            type: s.type || 'line',
		            data: s.data,
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'},
		                    {type : 'min', name: '最小值'}
		                ]
		            }
				}
				series.push(t);
				boundaryGap = s.type == 'bar';
			}
			var option = {
				title : {
					text : config.title,
					x:'center'
				},
				tooltip : {
					trigger : 'axis'
				},
				legend : {
					 y: 'bottom',
					data : config.legend
				},
				toolbox : {
					show : true,
					feature : {
						saveAsImage : {
							show : true
						}
					}
				},
				calculable : true,
				xAxis : [ {
					type : 'category',
					boundaryGap : boundaryGap,
					axisLabel : {
						interval : 0
					},
					data : config.xAxis
				} ],
				yAxis : [ {
					type : 'value'
				} ],
				series : series
			}
			return option;
		}
		Util.resizeDiv = function(ele, wRate, hRate) {
			 if (arguments.length != 3) {
					wRate = 1.1;
					hRate = 0.7;
			 }
			 var pagewidth = $(window).width();
			 var pageheight = $(window).height();
			 $('#' + ele).height(pageheight * hRate);
			 $('#' + ele).width(pagewidth * wRate);
		 };
		Util.getPageHeight = function() {
			return $(window).height();
		}
		Util.initChart = function(option, id, cloneId) {
			Util.resizeDiv(id);
			if(arguments.length == 3) {
				var clone = $('#' + id).clone();
				clone.attr('id', cloneId);
				clone.show();
				$('#' + id).after(clone);
				id = cloneId;
			}
			var myChart = echarts.init(document.getElementById(id));
			myChart.setOption(option);
			$('#' + id).data('echart', myChart);
			Util.chartIds.push(id);
		}
		if (!window.Util) {
			window['Util'] = Util;
		}
	})(jquery, echarts);
});