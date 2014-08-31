$(function(){

	var clickNum = 0;

	$(".cut").click(function(){
		if(clickNum < 2){
			$(".foodwrapper .food").eq(clickNum).css("marginLeft", "20px");
		}

		if(clickNum == 2){
			alert("finish");
		}
		clickNum++;

	});

});