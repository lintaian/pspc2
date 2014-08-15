$(document).on('pageinit', '#page1', function() {
	$('#loginCommit').on('tap',function(){
		var name = $('#name').val();
		var pwd = $('#pwd').val();
		if(name == '' || pwd == '') {
			openDialog('请输入用户名和密码!');
		} else {
			$.ajax({
				type: 'post',
				url: 'login',
				dataType: 'json',
				contentType: 'application/json;charset=UTF-8',
				data: JSON.stringify({
					username: name,
					password: pwd
				}),
				success: function(data) {
					if(data.status) {
						window.location.href = "main";
					} else {
						openDialog(data.msg);
					}
				}
			})
		}
	});
	function openDialog(msg) {
		$('#dialog [data-custom-dialog="text"]').text(msg);
		$.mobile.changePage('#dialog', {role: 'dialog'});
	}
})
