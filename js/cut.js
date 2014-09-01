$(function(){

	var clickNum = 0;

	$(".cut").click(function(){
		console.log($(this).children("div").eq(clickNum));
		if(clickNum < 2){
			$(this).children("div").eq(clickNum).css("marginLeft", "20px");
		}

		if(clickNum == 2){
            alert("おかあさんをまってね");
			var scroll = $("body").scrollTop();
			$("body").scrollTop(scroll+960);
			clickNum = 0;
		}
		else{
			clickNum++;
		}

	});

});