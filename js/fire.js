


$(function(){

	var fireFlagOff = 0;
	var fireFlagOn = 0;

	$(".gas.on .gasSwitch").rotate({
		angle: 120
	})

	$(".gas.off .gasSwitch").rotate({
        bind:
            {
            click: function(){

            		if(fireFlagOff == 0){
	                    $(this).rotate({
	                        angle: 0,
	                        animateTo: 120,
	                        easing: $.easing.easeInOutExpo
	                    })
	                    fireFlagOff = 1;

	                    $(".gas.off").css("background", "url(\"images/utensil/img_gas_on.png\")");

	                }else{
	                    $(this).rotate({
	                        angle: 120,
	                        animateTo: 0,
	                        easing: $.easing.easeInOutExpo
	                    })
	                    fireFlagOff = 0;
	                    $(".gas.off").css("background", "url(\"images/utensil/img_gas_off.png\")");

	                }

                }
            }
    });

	$(".gas.on .gasSwitch").rotate({
        bind:
            {
            click: function(){

            		if(fireFlagOn == 0){
	                    $(this).rotate({
	                        angle: 120,
	                        animateTo: 0,
	                        easing: $.easing.easeInOutExpo
	                    })
	                    fireFlagOn = 1;

	                    $(".gas.on").css("background", "url(\"images/utensil/img_gas_off.png\")");

	                }else{
	                    $(this).rotate({
	                        angle: 0,
	                        animateTo: 120,
	                        easing: $.easing.easeInOutExpo
	                    })
	                    fireFlagOn = 0;
	                    $(".gas.on").css("background", "url(\"images/utensil/img_gas_on.png\")");

	                }

                }
            }
    });



});