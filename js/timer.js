var s = 0;
var m = 0;

$(function(){
console.log("hoi");
  $('.add').click(function(){
    m++;
    $('.min').text(m);
  });

  $('.minus').click(function(){
    console.log("heyhey");
    if(m>0){
      m--;
      $('.min').text(m);
    }
  });

  $('.start').click(function(){
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
  });
});
