function dialogOpen(userId, imgName) {
	
	//userId로 dialog 제목 변경
	var title = $("#my-dialog-title");
	title.html(userId + ' 님의 근무상세');
	
	//user에 따른 이미지 교체
	var imgTag = $("#content-img");
	var imgUrl = "/imgs/" + imgName; 
	imgTag.attr("src", imgUrl);
	
	var dialog = $(".mdc-dialog");
	dialog.removeClass("close");
	dialog.addClass("open");
}

function dialogClose() {
	
	var title = $("#my-dialog-title");
	title.html('근무상세');

	var dialog = $(".mdc-dialog");
	dialog.removeClass("open");
	dialog.addClass("close");
}