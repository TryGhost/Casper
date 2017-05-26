var quotes = [
  'this is a quote.'
  'this is also a quote.'
  'one more quote for the road.'
]

function newQuote() {
  var rand = Math.floor(Math.random() * (quotes.length));
  document.getElementById('quote').innerHTML =  quotes[rand];
}
