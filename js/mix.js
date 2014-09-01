$(function(){
 
    var count = 0;

    var $mixes = $(".mix");
    var isRolling = false;

    var oldX, oldY, sumArc = 0;


    $.each($mixes, function(){
        var $mix = $(this);

        var $canvas = $mix.find('canvas');

        var is_pressed_shift = false; //Shiftキーが押されているかどうか
            // init_image_scale; //初期拡大率
     
        // 葛飾北斎画像の位置とか色々更新するやつ
        var updateImageView = function() {
            var boarder_layer = $canvas.getLayer("boarder"),
                image_layer = $canvas.getLayer("image");
     
            image_layer.x = boarder_layer.x;
            image_layer.y = boarder_layer.y;
            image_layer.scale = boarder_layer.scale;
            image_layer.rotate = boarder_layer.rotate;
        };
     
        // Zoomアイコンの位置とか色々更新するやつ
        var updateZoomView = function() {
            var boarder_layer = $canvas.getLayer("boarder"),
                zoom_layer = $canvas.getLayer("zoom"),
                x = boarder_layer.width / 2 * boarder_layer.scale,
                y = boarder_layer.height / 2 * boarder_layer.scale,
                radian = boarder_layer.rotate / 180 * Math.PI;
     
            zoom_layer.x = boarder_layer.x + (x * Math.cos(radian) - y * Math.sin(radian));
            zoom_layer.y = boarder_layer.y + (x * Math.sin(radian) + y * Math.cos(radian));
            zoom_layer.rotate = boarder_layer.rotate;
        };
     
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
     
        // Shiftキーが押されているかの管理
        $(document).keydown(function(e){
            if (e.which === 16) {
                is_pressed_shift = true;
            }
        });
        $(document).keyup(function(e){
            is_pressed_shift = false;
        });
        // 画像の読み込みが終わったら表示。
        // 一回、非表示領域で読み込ませてキャッシュさせておく。そうすると、もう一回表示するときはすぐ表示されるので
        // IEだとイメージの読み込みイベントが色々駄目なんで, jquery.imagesloadプラグイン使用。
        $('.preload').imagesLoaded(function(){
            // setTimeout(function(){
                var image_layer,
                    image_height = $('.preload img:eq(1)')[0].height,
                    image_width = $('.preload img:eq(1)')[0].width,
                    height_ratio = image_height / $('.preload img:eq(0)')[0].height,
                    width_ratio = image_width / $('.preload img:eq(0)')[0].width,
     
                init_image_scale = 1 / Math.max(height_ratio, width_ratio);
     
                // ローディングアイコンを非表示に
                $('.canvas-wrapper div').hide();
     
                // スマホケース(？)の画像
                $canvas.drawImage({
                    name: 'base',
                    layer: true,
                    source: $mix.find('.preload img:eq(0)')[0],
                    x: $canvas.width() / 2,
                    y: $canvas.height() / 2,
                    scale: 0.7,
                    mask: false
                });
     
                // ケースのデザインに使用する画像。葛飾北斎
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
     
                // 葛飾北斎画像の枠線レイヤー
                // コイツをドラッグイベントに対応させて葛飾北斎画像とかをアプデートする
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
                        updateZoomView();
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
     
                // Zoomアイコン。こいつをひっぱると葛飾北斎画像が拡大する
                $canvas.drawRect({
                    name: 'zoom',
                    layer: true,
                    fillStyle: "#000",
                    x: image_layer.x + image_layer.width * image_layer.scale / 2,
                    y: image_layer.y + image_layer.height * image_layer.scale / 2,
                    width: 20,
                    height: 20,
                    cursor: 'pointer',
                    draggable: true,
                    opacity: 0,
                    dragstart: function(layer) {
                        var boarder_layer,
                            distanceX,
                            distanceY;
     
                        // 距離を計算。前回のScaleも保持しておく
                        boarder_layer = $canvas.getLayer("boarder");
                        distanceX = layer.eventX - boarder_layer.x;
                        distanceY = layer.eventY - boarder_layer.y;
                        layer.data.startDistance = Math.sqrt(Math.pow(distanceX,2) + Math.pow(distanceY,2));
                        layer.data.startScale = boarder_layer.scale;
     
                        // 半透明にする
                        $canvas.getLayer("image").opacity = 0.5;
                    },
                    drag: function(layer) {
                        var boarder_layer,
                            distanceX,
                            distanceY,
                            distance,
                            scale;
     
                        // 距離を計算
                        boarder_layer = $canvas.getLayer("boarder");
                        distanceX = layer.eventX - boarder_layer.x;
                        distanceY = layer.eventY - boarder_layer.y;
                        distance = Math.sqrt(Math.pow(distanceX,2) + Math.pow(distanceY,2));
                        // スケールを計算し、設定
                        scale = distance / layer.data.startDistance;
                        boarder_layer.scale = scale * layer.data.startScale;
                        // 他のビューの更新
                        updateImageView();
                        updateZoomView();
                        updateRotateView();
                    },
                    dragstop: function(layer) {
                        // 透過解除
                        $canvas.getLayer("image").opacity = 1;
                    },
                    data: {
                        startDistance: 0,
                        startScale: init_image_scale
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

                        oldX = layer.eventX;
                        oldY = layer.eventY;

                        // 半透明にする
                        $canvas.getLayer("image").opacity = 1;
                    },
                    drag: function(layer, ev) {
                        var boarder_layer,
                            distanceX,
                            distanceY,
                            radian,
                            angle,
                            add;




                         // 角度を計算
                        boarder_layer = $canvas.getLayer("boarder");
                        distanceX = layer.eventX - boarder_layer.x;
                        distanceY = layer.eventY - boarder_layer.y;
                        radian = Math.atan2(distanceY, distanceX);
                        angle = radian / (Math.PI / 180);
                        //console.log("start=", layer.data.startAngle);
                        dragangle = angle - layer.data.startAngle;

                        if(isRolling){
                            var x1 = layer.eventX/(Math.sqrt(((layer.eventX)*(layer.eventY))+((layer.eventX)*(layer.eventY))));
                            var y1 = layer.eventY/(Math.sqrt(((layer.eventX)*(layer.eventY))+((layer.eventX)*(layer.eventY))));
                            var x2 = oldX/(Math.sqrt(((oldX)*(oldY))+((oldX)*(oldY))));
                            var y2 = oldY/(Math.sqrt(((oldX)*(oldY))+((oldX)*(oldY))));

                            add = Math.sqrt(((x2-x1)*(x2-x1)) + ((y2-y1)*(y2-y1)));

                            sumArc += add;
                            oldX = layer.eventX;
                            oldY = layer.eventY;
                        }

                        if (is_pressed_shift) {//シフトキーを押しているときは45度単位で移動
                            if (angle > 0 && angle < 45) {
                                boarder_layer.rotate = 90;
                            } else if (angle > 45 && angle < 90) {
                                boarder_layer.rotate = 135;
                            } else if (angle > 90 && angle < 135) {
                                boarder_layer.rotate = 180;
                            } else if (angle > 135 && angle < 180) {
                                boarder_layer.rotate = 225;
                            } else if (angle > -180 && angle < -135) {
                                 boarder_layer.rotate = 270;
                            } else if (angle > -135 && angle < -90) {
                                boarder_layer.rotate = 315;
                            } else if (angle > -90 && angle < -45) {
                                boarder_layer.rotate = 0;
                            } else if (angle > -45 && angle < 0) {
                                boarder_layer.rotate = 45;
                            }
                        } else {//そうじゃないときは細かく移動


                            boarder_layer.rotate = layer.data.startRotate + (dragangle);

                        }
                       if(sumArc > 6){
                            alert("おかあさんをまってね");
                            sumArc = 0;
                            var scroll = $("body").scrollTop();
                            $("body").scrollTop(scroll+$(".foodwrapper").height());
                        }
                        // 他のビューの更新
                        updateImageView();
                        updateZoomView();
                        updateRotateView();

                        isRolling = true;

 
                    },
                    dragstop: function(layer) {
                        // 透過解除
                        $canvas.getLayer("image").opacity = 1;
                        isRolling = false;
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
            // }, 1000);
        });
    });
});