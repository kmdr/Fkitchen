function scrollDownT(){
	var scroll = $("body").scrollTop();
	$("body").scrollTop(960);
}


$(function(){
	$(".button").click(function(){

		setTimeout('scrollDownT()',1000);
	})

	$(".goTop").click(function(){
		 $(".foodwrapper").remove();
		$("body").scrollTop(0);
	})

});