$(function(){

	var clickNum = 0;

	$(".cut").click(function(){
		console.log($(this).children().eq(clickNum));
		if(clickNum < 2){
			$(this).children().eq(clickNum).css("marginLeft", "20px");
			console.log("ok");
		}

		if(clickNum == 2){
			alert("finish");
			var scroll = $("body").scrollTop();
			$("body").scrollTop(scroll+960);
			clickNum = 0;
		}
		else{
			clickNum++;
		}

	});

});