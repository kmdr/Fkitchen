$(function(){
 
    var count = 0;
    var $mixes = $(".mix");

  


    $.each($mixes, function(){
	   // 葛飾北斎画像の位置とか色々更新するやつ
	    var updateImageView = function() {
	        var boarder_layer = $canvas.getLayer("boarder"),
	            image_layer = $canvas.getLayer("image");
	 
	        image_layer.x = boarder_layer.x;
	        image_layer.y = boarder_layer.y;
	        image_layer.scale = boarder_layer.scale;
	        image_layer.rotate = boarder_layer.rotate;
	    };
	 
	    // // Zoomアイコンの位置とか色々更新するやつ
	    // var updateZoomView = function() {
	    //     var boarder_layer = $canvas.getLayer("boarder"),
	    //         zoom_layer = $canvas.getLayer("zoom"),
	    //         x = boarder_layer.width / 2 * boarder_layer.scale,
	    //         y = boarder_layer.height / 2 * boarder_layer.scale,
	    //         radian = boarder_layer.rotate / 180 * Math.PI;
	 
	    //     zoom_layer.x = boarder_layer.x + (x * Math.cos(radian) - y * Math.sin(radian));
	    //     zoom_layer.y = boarder_layer.y + (x * Math.sin(radian) + y * Math.cos(radian));
	    //     zoom_layer.rotate = boarder_layer.rotate;
	    // };
	 
	    // 回転アイコンの位置とか色々更新するやつ
	    var updateRotateView = function() {
	        var boarder_layer = $canvas.getLayer("boarder"),
	            rotate_layer = $canvas.getLayer("rotate"),
	            x = 0,
	            y = 0,
	            radian = boarder_layer.rotate / 180 * Math.PI;
	        rotate_layer.x = boarder_layer.x + (x * Math.cos(radian) + y * Math.sin(radian));
	        rotate_layer.y = boarder_layer.y + (x * Math.sin(radian) - y * Math.cos(radian));
	        rotate_layer.rotate = boarder_layer.rotate;
	    };

    	var $mix = $(this);
    	var $canvas = $mix.find('canvas');

        var image_layer,
            image_height = $('.preload img:eq(1)')[0].height,
            image_width = $('.preload img:eq(1)')[0].width,
            height_ratio = image_height / $('.preload img:eq(0)')[0].height,
            width_ratio = image_width / $('.preload img:eq(0)')[0].width;



    	// bg
		$canvas.drawImage({
			name: 'base',
			layer: true,
			source: $mix.find('.preload img:eq(0)')[0],
			x: $canvas.width() / 2,
			y: $canvas.height() / 2,
			scale: 0.7,
			mask: false
		});

	   	// carry
        $canvas.drawImage({
            name: 'image',
            layer: true,
            source: $mix.find('.preload img:eq(1)')[0],
            x: $canvas.width() / 2,
            y: $canvas.height() / 2,
            scale: 0.7
        });
        // マスク解除する
        $canvas.draw({
            layer: true,
            fn: function() {
                $(this).restoreCanvas();
            }
        });

        image_layer = $canvas.getLayer("image");

        $canvas.drawRect({
            name: 'boarder',
            layer: true,
            strokeStyle: "#000",
            strokeWidth: 0,
            x: $canvas.width() / 2,
            y: $canvas.height() / 2,
            scale: image_layer.scale,
            width: image_layer.width,
            height: image_layer.height,
            draggable: true,
            cursor: 'pointer',
            drag: function(layer) {
                updateImageView();
                // updateZoomView();
                updateRotateView();
            },
            dragstart: function(layer) {
                // 半透明にする
                $canvas.getLayer("image").opacity = 1;
            },
            dragstop: function(layer) {
                // 透過解除
                $canvas.getLayer("image").opacity = 1;
            }
        });

        $canvas.drawArc({
            name: 'rotate',
            layer: true,
            fillStyle: "#000",
            x: $canvas.width() / 2,
            y: $canvas.height() / 2,
            radius: 250,
            cursor: 'pointer',
            draggable: true,
            opacity: 0,
            dragstart: function(layer) {
                var boarder_layer,
                    distanceX,
                    distanceY,
                    radian;

                // 軸ごとの距離から角度を計算
                boarder_layer = $canvas.getLayer("boarder");
                distanceX = layer.eventX - boarder_layer.x;
                distanceY = layer.eventY - boarder_layer.y;
                radian = Math.atan2(distanceY, distanceX);
                layer.data.startAngle = radian / (Math.PI / 180);
                layer.data.startRotate = boarder_layer.rotate;

                // 半透明にする
                $canvas.getLayer("image").opacity = 1;
            },
            drag: function(layer, ev) {
                var boarder_layer,
                    distanceX,
                    distanceY,
                    radian,
                    angle;
                 // 角度を計算
                boarder_layer = $canvas.getLayer("boarder");
                distanceX = layer.eventX - boarder_layer.x;
                distanceY = layer.eventY - boarder_layer.y;
                radian = Math.atan2(distanceY, distanceX);
                angle = radian / (Math.PI / 180);
 
                 console.log(count, angle);
                if(angle > 0 && angle < 30){
                    count++;
                }

                if(count > 30){
                    alert("finish!");
                }

                // if (is_pressed_shift) {//シフトキーを押しているときは45度単位で移動
                //     if (angle > 0 && angle < 45) {
                //         boarder_layer.rotate = 90;
                //     } else if (angle > 45 && angle < 90) {
                //         boarder_layer.rotate = 135;
                //     } else if (angle > 90 && angle < 135) {
                //         boarder_layer.rotate = 180;
                //     } else if (angle > 135 && angle < 180) {
                //         boarder_layer.rotate = 225;
                //     } else if (angle > -180 && angle < -135) {
                //         boarder_layer.rotate = 270;
                //     } else if (angle > -135 && angle < -90) {
                //         boarder_layer.rotate = 315;
                //     } else if (angle > -90 && angle < -45) {
                //         boarder_layer.rotate = 0;
                //     } else if (angle > -45 && angle < 0) {
                //         boarder_layer.rotate = 45;
                //     }
                // } else {//そうじゃないときは細かく移動
                //     boarder_layer.rotate = layer.data.startRotate + (angle - layer.data.startAngle);
                // }
                // 他のビューの更新
                updateImageView();
                updateRotateView();
            },
            dragstop: function(layer) {
                // 透過解除
                $canvas.getLayer("image").opacity = 1;
            },
            data: {
                startAngle: 0,
                startRotate: 0
            }
        });

        $('.convert-to-image').click(function(){
            $('.generated-image').empty();
            $('<img>').attr('src', $canvas.getCanvasImage("jpeg", 0.8)).appendTo('.generated-image');
        });



    })

});