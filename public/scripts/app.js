// Global variable 
const url = "/tweets";

// Everything inside  document ready so that page load is success
$(document).ready(function() {

// Function that creates new article html element (old tweet)
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
  
    // Update tweet time with moment.js package
    let postDate = new Date(articleObj.created_at);
    let postTimePassedSinceNow = moment(postDate).fromNow();
    const $footer = $('<footer>').text(
      `Created ${postTimePassedSinceNow}`
    );
    const $icon =$('<i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>');
    const $footerdiv = $('<div>');
    $footerdiv.append($icon);
    $footer.append($footerdiv);
    $article.append($footer);
  
    return $article;
  };

// Function that creates new article using data in the database
function renderTweets(input) {

    for (const article of input) {
      const $articleEl = createArticle(article);
      $('#oldtweets').append($articleEl);
    }
}

// Post Request function using Ajax;
const request = url => {

    var $tweet = $('form');
    $tweet.on('submit', function (event) {
    event.preventDefault();
    $.ajax({
    url: url,
    method: "POST",
    data: $(this).serialize()
    })

    .done(function(res) {
    $('#oldtweets').empty();
    loadTweets(url, 'all');
    console.log('this works', event);
    $('form')[0].reset();
    $('.counter').text(140);
    })
    .fail(function(error) {
    console.log( "Request failed: " + error );
    });
    });
};


// Get Request function using Ajax
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

// Error message implementation
    const $button = $('input');
    const $error = $('.error-message');
    $button.on('click', function(event){
            $error.slideUp();
        const $textlength =  $('form textarea').val().length;
        if ($textlength === 0) {
            $error.text("Please put in some text!");
            $error.slideDown();
            event.preventDefault(event);
        } else if($textlength > 140) {
            $error.text("You've maxed out your text length!");
            $error.slideDown();
            event.preventDefault(event);
        } else {
            request(url);
        }
    });


// Form toggle on compose tweet and auto-select
    $("nav button").click(function() {
        $(".new-tweet").slideToggle("fast");
        $("textarea").focus();
    });


// Load tweets upon page load
    loadTweets(url, 'all');


// Document ready end bracket
});






