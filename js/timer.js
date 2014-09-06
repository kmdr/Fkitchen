var s = 10;
var m = 0;
var isStart = false // timerスタートを判定するフラグ

$(function(){

  // timerの操作
  $('.timerAdd').click(function(){
    if(!isStart){
      // m++;
      // $('.min').text(m);

      $('.sec').text(s);


    }
  });

  $('.timerMinus').click(function(){
    if(m>0 && !isStart){
      m--;
      $('.min').text(m);
    }
  });


  // start後
  $('.start').click(function(){
    // if(m>0){
      isStart = true;
      var timer = window.setInterval(function(){
        if(s==0){
        	m--;
        	s = 59;
        } else {
        	s--;
        }

        if(s==0 && m==0){
        	$(document).stopTime('timer');
        	$('.time').text('できたよ！ままをよぼう！');
        }
        $('.min').text(m);
        
        if(s<10){
          $('.sec').text('0'+s);
        } else {
          $('.sec').text(s);
        }
      }, 1000);
    // }
  });
});
