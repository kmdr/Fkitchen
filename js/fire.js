


$(function(){

	var fireFlag = 0;
	console.log(fireFlag);

	$(".gas .gasSwitch").rotate({
        bind:
            {
            click: function(){

            		if(fireFlag == 0){
	                    $(this).rotate({
	                        angle: 0,
	                        animateTo: 120,
	                        easing: $.easing.easeInOutExpo
	                    })
	                    fireFlag = 1;

	                    $(".gas").css("background", "url(\"images/utensil/img_gas_on.png\")");

	                }else{
	                    $(this).rotate({
	                        angle: 120,
	                        animateTo: 0,
	                        easing: $.easing.easeInOutExpo
	                    })
	                    fireFlag = 0;
	                    $(".gas").css("background", "url(\"images/utensil/img_gas_off.png\")");

	                }

                }
            }
    });

	console.log(fireFlag);
});