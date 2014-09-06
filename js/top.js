function scrollDownT(){
	var scroll = $("body").scrollTop();
	$("body").scrollTop(960);
}


$(function(){
	$(".makebutton").click(function(){
		console.log(".button click");
		setTimeout('scrollDownT()',1000);
	})

	$(".goTop").click(function(){
		console.log(".goTop click");
		$(".foodwrapper").remove();
		$("body").scrollTop(0);
	})

});