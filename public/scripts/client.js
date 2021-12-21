/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const $btnUp = $("#scrollUp");
$btnUp.on("click", () =>
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })
);

// Gets text form an input, help prevent XSS
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// The loadTweets function will make a jQuery
// request to /tweets and return a JSON
// array of tweets.
const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "json",
    success: (tweets) => renderTweets(tweets),
    error: (err) => {
      console.log(`error: ${err}`);
    },
  });
};

// Our template
const createTweetElement = function (obj) {
  const time = timeago.format(obj.created_at);
  const $tweet = $(`<article class="tweet-container">
  <header>
  <div class="name-handle">
    <img src=${obj["user"]["avatars"]} alt="" />
    &nbsp;
    <div class="name">${obj["user"]["name"]}</div>
    <div class="handle">${obj["user"]["handle"]}</div>
  </div>
</header>
<label for="tweets">${escape(obj["content"]["text"])}</label>
<textarea name="text" class="tweets"></textarea>
<footer>
  <div class="time-icon">
    <div class="time">${time}</div>
    <div class="icons">
      <a href="/flag">
        <i class="fas fa-flag"></i>
      </a>
      &nbsp;
      <a href="/retweet">
        <i class="fas fa-retweet"></i>
      </a>
      &nbsp;
      <a href="/love">
        <i class="fas fa-heart"></i>
      </a>
    </div>
  </div>
</footer>
  </article><br />`);

  return $tweet;
};

//Takes in this array of objects and render them to the DOM
const renderTweets = function (tweets) {
  const $tweetsContainer = $("#tweets-container");
  $tweetsContainer.html("");
  for (let tweetsOfData of tweets) {
    $tweet = createTweetElement(tweetsOfData);
    $tweetsContainer.prepend($tweet);
  }
};

/**
 * We can now submit the form data and display the new tweet without
 * having to refresh the page by using jQuery. To accomplish this,
 * we used an event handler to bypass the standard form submission
 * process and instead use AJAX to submit the form data.
 */
const $form = $("#tweetBtn");

$form.on("submit", function (event) {
  event.preventDefault();

  console.log("The form was submitted!");

  let $userInput = $("textarea", this);

  //form validation
  if ($userInput.val().length > 140) {
    $(".error").slideDown("slow");
    $("#errorMessage").text(`Character is too long!`);
  } else if ($userInput.val().length === 0) {
    $(".error").slideDown("slow");
    $("#errorMessage").text(`Character is empty!`);
  } else if ($userInput.val() === "null" || $userInput.val() === '""') {
    $(".error").slideDown("slow");
    $("#errorMessage").text(`Character: ${$userInput.val()} is invalid`);
  } else {
    $(".error").slideUp("slow");
    $btnUp.slideDown("slow");
    $('output[name="counter"]').html('140');
    // Serialized the form data
    const serializedData = $userInput.serialize();
    console.log(serializedData);

    $.ajax({
      url: "/tweets/",
      method: "POST",
      data: serializedData,
      // This gets called after POST /tweets/. its a callback as we want the data
      // to actually be there before it gets fetched.
      success: () => {
        loadTweets();
        $userInput.val("");
      },
    });
  }
});

//To reload our tweets on refresh or start
loadTweets()