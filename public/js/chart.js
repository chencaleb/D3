/* ----- GENERATE CHART TO DOM ----- */
var chart = c3.generate({
  bindto: '#chart',
  data: {
    x: 'Scripting',
    columns: [
      ['Scripting', 'Javascript', 'PHP', 'Java', 'Python', 'Ruby'],
      ['Twitter', 0, 0, 0, 0, 0],
    ],
    type: 'bar',
    colors: {
      Twitter: '#55acee',
      // Polls: '#eb1e00'
    }
  },
  axis: {
    x: {
      type: 'category',
      categories: ['Javascript', 'PHP', 'Java', 'Python', 'Ruby']
    }
  },
  bar: {
    width: {
      ratio: 0.45
    }
  },
  size: {
    height: 400,
    width: 945
  }
});

/* ----- START TWITTER STREAM ----- */
var socket = io.connect('http://localhost:8080');

socket.on('stream', function(tweet){
  console.log(tweet);

  $('#tweetHome').prepend('<img src="' + tweet.user.profile_image_url + '" class="profile-image"> ' 
    + '<b><font size="2">' + tweet.user.name + '</font></b>' + ' ' + '<font size="2" color="#8899A6">@' 
    + tweet.user.screen_name + '</font>' + '<p class="streamed-tweets">' + tweet.text + '</p><hr>');

    if(tweet.text.indexOf(hashtagJs || javascriptMention) > -1) {
        ++js;
      };

    if(tweet.text.indexOf(hashtagPhp || phpMention) > -1) {
        ++php;
      };

    if(tweet.text.indexOf(hashtagJv || javaMention) > -1) {
        ++jv;
      };

    if(tweet.text.indexOf(hashtagPython || pythonMention) > -1) {
        ++python;
      };

    if(tweet.text.indexOf(hashtagRuby || rubyMention) > -1) {
        ++ruby;
      };
});

var js     = 0;
var php    = 0;
var jv     = 0;
var python = 0;
var ruby   = 0;

var hashtagJs    = '#Javascript';
var hashtagPhp  = '#PHP';
var hashtagJv   = '#Java';
var hashtagPython    = '#Python';
var hashtagRuby     = '#Ruby';
var javascriptMention  = 'Javascript';
var phpMention    = 'PHP';
var javaMention   = 'Java';
var pythonMention     = 'Python';
var rubyMention   = 'Ruby';

setInterval(function () {
  chart.load({
      columns: [
        ['Twitter', js, php, jv, python, ruby],
      ]
  });
}, 250);