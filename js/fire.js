function scrollDown(){
	var scroll = $("body").scrollTop();
	$("body").scrollTop(scroll+$(".foodwrapper").height());
console.log(scroll);
}


$(function(){


	$(".gas.on .gasSwitch").rotate({
		angle: 120
	})

	$(".gas.off .gasSwitch").rotate({
        bind:
            {
            click: function(){

	                    $(this).rotate({
	                        angle: 0,
	                        animateTo: 120,
	                        easing: $.easing.easeInOutExpo
	                    })
	                    fireFlagOff = 1;
	                    $(this).parent().css("background", "url(\"images/utensil/img_gas_on.png\")");
						setTimeout('scrollDown()',1000);
	              			


                }
            }
    });

	$(".gas.on .gasSwitch").rotate({
        bind:
            {
            click: function(){

	                    $(this).rotate({
	                        angle: 120,
	                        animateTo: 0,
	                        easing: $.easing.easeInOutExpo
	                    })
	                    fireFlagOn = 1;

	                    $(this).parent().css("background", "url(\"images/utensil/img_gas_off.png\")");
						setTimeout('scrollDown()',1000);

                }
            }
    });



});