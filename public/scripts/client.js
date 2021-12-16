/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */





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
<label for="tweets">${obj["content"]["text"]}</label>
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

const renderTweets = function (tweets) {
  const $tweetsContainer = $("#tweets-container");
  $tweetsContainer.empty;
  for (let tweetsOfData of tweets) {
    $tweet = createTweetElement(tweetsOfData);
    $tweetsContainer.append($tweet);
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

  // Serialized the form data
  const serializedData = $(this).serialize();
  console.log(serializedData);

  // $.post("/tweets", serializedData, (response) => {
  //   console.log(response);
  //   loadTweets();
  // });

  $.ajax({
    url: "/tweets/",
    method: "POST",
    data: serializedData,
    success: function(data){
      console.log('success')
    }
  })
});
