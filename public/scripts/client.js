/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
/**
 * This is our hard coded user database.
 */
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

/**
 * This function is responsible for taking in an array of tweet
 * objects and then appending each one to the #tweets-container.
 */
const renderTweets = function (tweets) {
  for (let tweetsOfData of tweets) {
    $tweet = createTweetElement(tweetsOfData);
    $("#tweets-container").append($tweet);
  }
};

/**
 * This takes in a tweet object and is responsible for returning
 * a tweet <article> element containing the entire HTML structure
 * of the tweet.
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

/**
 * This here calls in our functions above and works out
 * our final output.
 */

$(document).ready(function () {
  $("#tweetBtn").submit(function (event) {
    event.preventDefault();
    renderTweets(data);

    //Our ajax post request
    $.ajax({
      method: "POST",
      url: "http://localhost:8080/tweets/",
      data: $("#tweetBtn").serialize(),
      success: function (data) {
        console.log("success");
      },
    });
    
  });
});
