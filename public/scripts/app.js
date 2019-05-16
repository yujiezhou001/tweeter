/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// global variable 
const url = "/tweets"

//Everything inside document.ready
$(document).ready(function() {

// Create new article function
const createArticle = articleObj => {
    const $article = $('<article>');
    const $header = $('<header>');
    const $img = $('<img>').attr('src', articleObj.user.avatars.small);
    const $h2 = $('<h2>').text(articleObj.user.name);
    const $div =$('<div>');
    $div.append($img);
    $div.append($h2);
    const $handle =$('<p>').text(articleObj.user.handle);
    $header.append($div);
    $header.append($handle);
    $article.append($header);
    const $contentDiv = $('<div>').addClass('content');
    const $ul = $('<ul>');
    const $tweetsLi = $('<li>').text(articleObj.content.text);
    const $tweetsSpan = $('<span>').text('Tweets: ');
    $tweetsLi.prepend($tweetsSpan);
    $ul.append($tweetsLi);
    $contentDiv.append($ul);
    $article.append($contentDiv);
  
    const $footer = $('<footer>').text(
      `Created at ${articleObj.created_at}`
    );
  
    $article.append($footer);
  
    return $article;
  };

  // function that creates new article using data in the database
function renderTweets(input) {

    for (const article of input) {
      const $articleEl = createArticle(article);
      $('#oldtweets').append($articleEl);
    }
}

//Post Request function using Ajax;

const request = url => {

    var $tweet = $('form');
    $tweet.on('submit', function (event) {
    event.preventDefault();
      
    $.ajax({
    url: url,
    method: "POST",
    data: $(this).serialize()
    })

    .done(function() {
    loadTweets(url, "some");
    console.log('this works heeere', event);
    $('form')[0].reset();
    })
    .fail(function(error) {
    console.log( "Request failed: " + error );
    });
    });
};


//Get Request function using Ajax

const loadTweets = (url, loadAll) => {
    $.ajax({
        url: url,
        method: 'GET' 
        })
            
        .done(function (response) {
            if (loadAll === "all") {
                renderTweets(response);
            } else {
                const $articleEl = createArticle(response.pop());
                $('#oldtweets').prepend($articleEl);
            }
        })

        
        .fail(function (error) {
        console.log(`Error: ${error}`);
        })
    };

    const $button = $('input');
    const $error = $('.error-message');
    $button.on('click', function(event){
            $error.slideUp();
        const $textlength =  $('form textarea').val().length;
        if ($textlength === 0) {
            $error.text("Please put in some text!")
            $error.slideDown();
            event.preventDefault(event);
        } else if($textlength > 140) {
            $error.text("You've maxed out your text length!")
            $error.slideDown();
            event.preventDefault(event);
        } else {
            request(url);
        }
    });

//Form toggle on compose tweet and auto-select

$("nav button").click(function() {
    $(".new-tweet").slideToggle("fast");
    $("textarea").focus();
    });









//document ready end bracket
});



// loadTweets(url);
//console.log($('form textarea').val());





