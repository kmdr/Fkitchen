$(function(){

	var clickNum = 0;

	$(".wrapper").click(function(){
		$(".wrapper .food").eq(clickNum).css("marginLeft", "20px");
		clickNum++;

		if(clickNum == 2){
			alert("finish");
		}

	});

});