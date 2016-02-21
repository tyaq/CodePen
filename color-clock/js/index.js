function tickTock() {
  var time, hrs, min, sec;
  var background, shadow;

  // gets the hours, min, & sec
  time = new Date();
  hrs = time.getHours();
  min = time.getMinutes();
  sec = time.getSeconds();
  var t = (hrs * 60 + min) * 60 + sec;

  var S = 255 - 30 * (Math.cos(2 * Math.PI * sec / 60) + 1);

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
  // var S = "linear-gradient(to right," + background + "," + shadow + ")";
  // S = "linear-gradient(to right, red,orange,yellow,green,blue,indigo,violet)"
  //Displays time
  $('#clock').text(hrs + ":" + min);
  $('#meridiem').text(sec + " " + meridiem);
  $('#colorCode').text(background);
  $('body').css("background-color", background);
  // $('body').css("background", S);

};

function getColor(A, t) {
  var r, b, g;
  var div = 24 * 60 * 60 / 6;
  
  //Creates a peicewise parametric function for Red, blue and green values over 24 hours
  if (t <= div) { //4 Indigo
    b = 181 + ((243 - 181) * t) / div;
    g = 81 + ((150 - 81) * t) / div;
    r = 63 + ((33 - 63) * t) / div;
  } else if (t <= 2 * div) { //8 Blue
    b = 243 + ((80 - 243) * (t - div)) / div;
    g = 150 + ((176 - 150) * (t - div)) / div;
    r = 33 + ((76 - 33) * (t - div)) / div;
  } else if (t <= 3 * div) { //12 Green
    b = 80 + ((59 - 80) * (t - 2 * div)) / div;
    g = 176 + ((235 - 176) * (t - 2 * div)) / div;
    r = 76 + ((255 - 76) * (t - 2 * div)) / div;
  } else if (t <= 4 * div) { //16 Yellow
    b = 59 + ((54 - 59) * (t - 3 * div)) / div;
    g = 235 + ((67 - 235) * (t - 3 * div)) / div;
    r = 255 + ((244 - 255) * (t - 3 * div)) / div;
  } else if (t <= 5 * div) { //20 Red
    b = 54 + ((183 - 54) * (t - 4 * div)) / div;
    g = 67 + ((58 - 67) * (t - 4 * div)) / div;
    r = 244 + ((103 - 244) * (t - 4 * div)) / div;
  } else if (t <= 6 * div) { //24 Purple
    b = 183 + ((181 - 183) * (t - 5 * div)) / div;
    g = 58 + ((81 - 58) * (t - 5 * div)) / div;
    r = 103 + ((63 - 103) * (t - 5 * div)) / div;
  };

  (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? $('body').addClass("light") : $('body').removeClass("light");

  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);

  var rgb = "rgb(" + r + "," + g + "," + b + ")";
  var hex = "#";

  //Pads single digits with leading zeros
  r == 0 ? hex += '00' : hex += r.toString(16);
  g == 0 ? hex += '00' : hex += g.toString(16);
  b == 0 ? hex += '00' : hex += b.toString(16);

  return hex.toUpperCase();
  // return rgb;
}

$(document).ready(function() {

  //Wait 1000 ms before updating
  setInterval(tickTock, 1000);

});