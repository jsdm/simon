/**
*          Classic SIMON GAME
*         for freeCodeCamp.com
*
*           by JSDM - 2016
*
*     Simple Game using CSS3 & jQuery
*
***********************************************
* Tested on Firefox, Chrome, Safari
***********************************************
*/
var inGame= false, turnUser = false, isOn = false, isStrict = false, sequence = [], turnLength = 0, speed = [1200, 700, 500, 300];
function findSequence() {
  sequence = [];
  var rand;
  for (var i = 0; i < 30; i++) {
    rand = (Math.floor(Math.random()*4)+1);
    sequence.push(rand);
  }
}
function displ(txt) {
  $(".disp h1").text(txt);
}
function lvlcalc() {
  if(turnLength < 3) {return speed[0];}
  if(turnLength < 6) {return speed[1];}
  if(turnLength < 9) {return speed[2];}
  if(turnLength < 12) {return speed[3];}
}
function toneNLight(num) {
  var audio = 0;
    switch(num) {
      case 1:
        $( ".green" ).addClass("light");
        audio = $(".1")[0];
        audio.play();
        setTimeout(function (){
        $( ".green" ).removeClass("light");
        }, 300);
        break;
      case 2:
        $( ".red" ).addClass("light");
        audio = $(".2")[0];
        audio.play();
        setTimeout(function (){
        $( ".red" ).removeClass("light");
        }, 300);
        break;
      case 3:
        $( ".yellow" ).addClass("light");
        audio = $(".3")[0];
        audio.play();
        setTimeout(function (){
        $( ".yellow" ).removeClass("light");
        }, 300);
        break;
      case 4:
        $( ".blue" ).addClass("light");
        audio = $(".4")[0];
        audio.play();
        setTimeout(function (){
        $( ".blue" ).removeClass("light");
        }, 300);
        break;
    }
}
function userTurn() {
  var j = 0;
  $( ".butn" ).click(function () {
    var butPress = Number($( this ).attr( "value" ));
    toneNLight(butPress);
    if(butPress == sequence[j]) {
      j++;
      if(j === turnLength) {
        turnLength ++;
        if(turnLength === 21) {
          displ("**");
          var nr = 0;
          var won = setInterval( function() {
            $('.disp').toggleClass('dispOn');
            nr ++;
            if(nr === 10) {
              j = 0;
              clearInterval(won);
              turnLength = 1;
              inGame =true;
              turnUser=false;
              findSequence();
              game();
            }
          }, 300);
          return false;
        }
        turnUser = false;
        $(".butn").off("click");
        var newTimer = setTimeout( function() {
          game();
          clearTimeout(newTimer);
        }, 700);
      }
    }
    else {
      displ("!!");
      turnUser = false;
      if(isStrict) {
        turnLength = 1;
        findSequence();
      }
      var newTimer = setTimeout( function() {
          game();
          clearTimeout(newTimer);
          $(".butn").off("click");
          displ(("0" + turnLength).slice(-2));
        }, 500);
    }
  });
  butPress = 0;
  j = 0;
}
function game() {
  displ(("0" + turnLength).slice(-2));
  lvl = lvlcalc();
  if(!turnUser) {
    var k = 0;
    var soundDelay = setInterval(function() {
      toneNLight(sequence[k]);
      k++;
      if(k >= turnLength) {
        clearInterval(soundDelay);
        turnUser = true;
        game();
      }
    }, lvl);
  }
  if(turnUser) {
    userTurn();
  }
}
function gameOn() {
  if(isOn) {
    $('.disp').addClass('dispOn');
    displ("--");
    $( '.startbtn' ).click(function() {
      turnLength = 1;
      sequence = [];
      inGame =true;
      turnUser=false;
      findSequence();
      game();
    });
    $( '.strictbtn' ).click(function() {
      if(isStrict){
        isStrict = false;
        $( '.led' ).removeClass('ledOn');
      }
      else {
        isStrict = true;
        $( '.led' ).addClass('ledOn');
      }
    });
  }
  else {
    $('.disp').removeClass('dispOn');
    displ("88");
    $( '.led' ).removeClass('ledOn');
    $('.startbtn').off( "click" );
    $('.strictbtn').off( "click" );
    isStrict = false;
    inGame = false;
  }
}

$(document).ready(function(){
  $("#onOff").click(function() {
    if(isOn) {isOn = false;}
    else {isOn = true;}
    gameOn();
  });
});
