var s = 0;
var m = 0;
var timer;
var isStart = false; // timerスタートを判定するフラグ
var isReset = false;

$(function(){

  // timerの操作
  $('.timerAdd').click(function(){
    if(!isStart){
      m++;
      $('.min').text(m);

      $('.sec').text(s);


    }
  });

  $('.timerMinus').click(function(){
    if(m>0 && !isStart){
      m--;
      $('.min').text(m);
    }
  });

  $('.timerReset').click(function(){

    if(isStart == true){
      clearInterval(timer);
      isStart = false;
    }
    m = 0;
    s = 0;
    $('.min').text(m);
    $('.sec').text(s);
  });

  $('.timerStop').click(function(){
    if(isStart){
      clearInterval(timer);
    }
  });

  // start後
  $('.start').click(function(){
    // if(m>0){
    isStart = true;
    timer = window.setInterval(function(){
      if(s==0){
	m--;
	s = 59;
      } else {
	s--;
      }

      if(s==0 && m==0){
	$(document).stopTime(timer);
	$('.time').text('できたよ！ままをよぼう！');
      } else {
	$('.min').text(m);

	if(s<10){
	  $('.sec').text('0'+s);
	} else {
	  $('.sec').text(s);
	}
      }

    }, 1000);
  });

  });
