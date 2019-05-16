// const articleObj = {

//     name: "Josh",
//     tweets: "Hi",
//     time: "2s",
//     small: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//     handle: "@SirIsaac"
// }

const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ]

const singleObject = data[0];

$(document).ready(function() {


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

// const $articleEl = createArticle(singleObject);
// $('#oldtweets').append($articleEl);

$(function renderTweets() {
    for (const article of data) {
      const $articleEl = createArticle(article);
      $('#oldtweets').append($articleEl);
    }
  });

});

// const rendertweets = data => {
//     for (const article of data) {
//     const $articleEl = createArticle(article);
//     $('#oldtweets').append($articleEl);
//     }
// }

// rendertweets(data);
  
  