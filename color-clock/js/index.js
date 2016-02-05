function tickTock() {
  var time, hrs, min, sec;
  var background, shadow;

  // gets the hours, min, & sec
  time = new Date();
  hrs = time.getHours();
  min = time.getMinutes();
  sec = time.getSeconds();
  var t = (hrs * 60 + min) * 60 + sec;

  var S = 255 - 15 * (Math.cos(2 * Math.PI * sec / 60) + 1);

  background = getColor(255, t);
  shadow = getColor(S, t);

  //Pads single digits with leading zeros
  if (min <= 9) {
    min = '0' + min
  };
  if (sec <= 9) {
    sec = '0' + sec
  };

  // Sets meridiem to AM or PM
  var meridiem = hrs >= 12 ? 'PM' : 'AM';
  var hrs = hrs % 12;
  // the 24-hour '0' will be '12'
  hrs = hrs ? hrs : 12;
  var S = "-webkit-linear-gradient(" + background + "," + shadow + ")";
  S = "linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)"
    //Displays time
  $('#clock').text(hrs + ":" + min);
  $('#meridiem').text(sec + " " + meridiem);
  $('#colorCode').text(background);
  $('body').css("background-color", background);

};

function getColor(A, t) {
  var r, b, g;
  var div = 24 * 60 * 60 / 6;

  if (t <= div) { //4
    b = A;
    g = A * t / div;
    r = 0;
  } else if (t <= 2 * div) { //8
    b = A - A * (t - div) / div;
    g = A;
    r = 0;
  } else if (t <= 3 * div) { //12
    b = 0;
    g = A;
    r = A * (t - 2 * div) / div;
  } else if (t <= 4 * div) { //16
    b = 0;
    g = A - A * (t - 3 * div) / div;
    r = A;
  } else if (t <= 5 * div) { //20
    b = A * (t - 4 * div) / div;
    g = 0;
    r = A;
  } else if (t <= 6 * div) { //24
    b = A;
    g = 0;
    r = A - A * (t - 5 * div) / div;
  };

  var rbg = "rgb(" + r + "," + g + "," + b + ")";
  var hex = "#";
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  r == 0 ? hex += '00' : hex += r.toString(16);
  g == 0 ? hex += '00' : hex += g.toString(16);
  b == 0 ? hex += '00' : hex += b.toString(16);

  return hex.toUpperCase();
}

$(document).ready(function() {

  //Wait 1000 ms before updating
  setInterval(tickTock, 1000);

});