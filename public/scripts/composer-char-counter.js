$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").keydown(function () {
    $('output[name="counter"]').html(139 - this.value.length);
    if (139 - this.value.length < 0) {
      $('output[name="counter"]').removeClass('counter-default-changer')
      $('output[name="counter"]').addClass('counter-red-changer')
    } else {
      $('output[name="counter"]').removeClass('counter-red-changer')
      $('output[name="counter"]').addClass('counter-default-changer')
    }
  });
});
/*
The code above is for our counter; we target the text area with #tweet-text, and we get the output/counter with output[name="counter"]. 
We begin with 140 because that is our chx limit, and we use this.value.length to determine the length of the chx.
*/
