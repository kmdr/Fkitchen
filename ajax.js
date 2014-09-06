var array = [];

$(document).ready(function(){
    $("#r_send").click(function(){
     
        var param = { "id": $("#r_id").val() };
 
        $.ajax({
            type: "get",
            url: "foodmethod.php",
            data: param,
            crossDomain: false,
            scriptCharset: 'utf-8'
        }).done(function(data){
	  var data2 = JSON.stringify(data);
	  array  = JSON.parse(data2);
	  var yes = document.createDocumentFragment();
	  var len = 0;
	  var objBody = document.getElementsByTagName("body").item(0);
	  var tmp = array["method"].length;
    //  console.log(tmp);
	  //len = array["method"][tmp-2]["order"];
      console.log(len);
	  var mixcount = 0;
      var ind = 0;

	  for(var i=0; i<tmp; i++){
        console.log("uaaaaaaaaaa"+i);
	    if(array["method"][i]["action"] == "cut") {
            ind = 0;
            console.log("cut");
            veg = array["method"][i]["food"];
            $('#container').append("<div class='foodwrapper cut'><h2>しょくざいをきろう</h2><div class='food'><img src='images/cookimg/"+veg+"_0.png' height='596' width='280' alt=''></div><div class='food'><img src='images/cookimg/"+veg+"_1.png' height='596' width='280' alt=''></div><div class='food'><img src='images/cookimg/"+veg+"_2.png' height='596' width='280' alt=''></div></div>");
	    }
        
        else if(array["method"][i]["action"] == "fire") {
            ind = 0;
            console.log("fire");
            $('#container').append("<div class='foodwrapper gason'>    <h2>ひをつけよう</h2>    <div class='pan'>     <img src='images/utensil/img_pan.png' height='349' width='735' alt=''>    </div>    <div class='gas off'>     <div class='gasSwitch'>      <img src='images/utensil/img_gasSwitch.png' height='80' width='80' alt=''>     </div>    </div>   </div>");
        }
        
        else if(array["method"][i]["action"] == "mix") {
            console.log("mix");
            if(ind ==0){
                if(mixcount == 0) {
                    console.log("water");
                    $('#container').append("  <div class='foodwrapper mix'>    <h2>まぜよう</h2>           <div class='canvas-wrapper'>              <canvas class='cover-canvas' width='800' height='450'></canvas>  <!--             <div><img src='images/img_board.png' height='227' width='366'></div>   -->          </div>             <!-- 生成される画像 -->          <div class='generated-image'>          </div>             <!-- 事前に一回画像を読み込ませておく -->          <div class='preload'>              <img src='images/utensil/img_inPan_bg.png' height='633' width='837'>              <img src='images/utensil/img_inPan_0.png' height='633' width='633'>          </div>       </div>");
                    mixcount++;
                    ind = 1;
                }
                else if(mixcount>0){
                    console.log("curry");
                    $('#container').append("<div class='foodwrapper mix'>    <h2>まぜよう</h2>           <div class='canvas-wrapper'>              <canvas class='cover-canvas' width='800' height='450'></canvas>  <!--             <div><img src='images/img_board.png' height='227' width='366'></div>   -->          </div>             <!-- 生成される画像 -->          <div class='generated-image'>          </div>             <!-- 事前に一回画像を読み込ませておく -->          <div class='preload'>              <img src='images/utensil/img_inPan_bg.png' height='633' width='837'>              <img src='images/utensil/img_inPan_1.png' height='633' width='633'>          </div>       </div>");
                    ind = 1;
                }
             else  {
                    i++;
                    ind = 0;
                }
            }

        }
        else if(array["method"][i]["action"] == "wait") {
            //ind = 0;
            console.log("wait");
            $('#container').append("<div class='foodwrapper timer'><p class='time'><button class='timerAdd'>+</button> <button class='timerMinus'>-</button><br><button class='timerReset'>リセット</button><button class='timerStop'>ちょっとまった！</button><br>あと <span class='min'>0</span> ふん <span class='sec'>00</span> びょう まってね<br><button class='start'>タイマーをはじめる</button></p></div>");
        }
        else if(array["method"][i]["action"] == "unfire") {
            ind = 0;
            console.log("unfire");
            $('#container').append("<div class='foodwrapper gasoff'>    <h2>ひをけそう</h2>     <div class='pan'>     <img src='images/utensil/img_pan.png' height='349' width='735' alt=''>    </div>    <div class='gas on'>     <div class='gasSwitch'>      <img src='images/utensil/img_gasSwitch.png' height='80' width='80' alt=''>     </div>    </div>   </div>");
        }


	  }


      $('#container').append("<div class='foodwrapper'><div class='finishimg'><img src='images/finishimg.png'><p class='goTop button buttonPink'>ちがうりょうり<br>をつくる</p></div></div>");
    $('head').append("<script type='text/javascript' src='js/cut.js'></script>  <script type='text/javascript' src='js/jqueryRotate.js'></script>  <script type='text/javascript' src='js/fire.js'></script>     <script src='js/imagesLoaded.js'></script>     <script src='js/jcanvas.js'></script>     <script src='js/mix.js'></script>     <script src='js/timer.js'></script>     <script src='js/top.js'></script>  </head> <style type='text/css'>     .canvas-wrapper {         position: relative;         width: 840px;         height: 640px;         margin: 0 auto;     }     .cover-canvas {         position: absolute;         background-color: #888;     }     .canvas-wrapper div{         position: absolute;         top: 209px;         left: 384px;     }     .preload {         display: none;     } </style> ");

	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
	  alert(errorThrown);
	});
    });


});
