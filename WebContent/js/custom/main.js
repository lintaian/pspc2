define(['jquery', 'echarts'], function($, echarts) {
	$(document).on('pageinit', '#mainPage', function() {
		/*$('[data-custom="logout"]').on('tap', function() {
			$(this).next().toggle();
		});*/
	});
	$(document).on('pageinit', '#transverseDetail', function() {
		Util.initChart(Util.getOption({
			title: '总分横向比较',
			legend: [ '总分'],
			xAxis: [ '个人得分', '\n班级均分', '年级均分', '\n地区均分' ],
			series: [{
				name: '总分',
				type: 'bar',
				data: [390, 367, 383, 352]
			}]
		}), 'transverseScoreReport');
	});
	$(document).on('pageinit', '#longitudinalDetail', function() {
		Util.initChart(Util.getOption({
			title: '总分纵向比较',
			legend: ['总分', '平均分'],
			xAxis: ['6月月考', '期末考试'],
			series: [{
				name: '总分',
				data: [390, 360]
			}, {
				name: '平均分',
				data: [370, 365]
			}]
		}), 'longitudinalReport', 'longitudinalReportTotal');
		Util.initChart(Util.getOption({
			title: '数学纵向比较',
			legend: ['数学', '平均分'],
			xAxis: ['6月月考', '期末考试'],
			series: [{
				name: '数学',
				data: [125, 140]
			}, {
				name: '平均分',
				data: [120, 123]
			}]
		}), 'longitudinalReport', 'longitudinalReportTotal');
	});
	$(document).on('pagebeforeshow', '#messageBoardChat', function() {
		$('#chatContent').css({'max-height': Util.getPageHeight()-155});
	});
	$(window).on("orientationchange", function (event) {
		Util.resizeChart();
	});
});