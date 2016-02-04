$(document).ready(function() {
  var time, hrs, min, sec;

  // gets the hours, min, & sec
  time = new Date();
  hrs = time.getHours();
  min = time.getMinutes();
  sec = time.getSeconds();
  
  // Sets meridiem to AM or PM
  var meridiem = hrs >= 12 ? 'PM' : 'AM';
  var hrs = hrs % 12;
  // the 24-hour '0' will be '12'
  hrs = hrs ? hrs : 12;

  //Displays time
  $('#clock').text(hrs + ":" + min );
  $('#meridiem').text(sec+" "+ meridiem);
});