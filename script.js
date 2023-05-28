const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let allQuotes = [];

// Show Loading 
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Get new Quote
function getNewQuote() {
  loading();
  const quote = allQuotes[Math.floor(Math.random() * allQuotes.length)];

  // Check quote length

  if (quote.text.split(' ').length > 15) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }

  // Set Quote, Hode loader

  authorText.textContent = quote.author;
  quoteText.textContent = quote.text;
  complete();
}


// Get Quotes from API
async function getQuotes() {
  loading()

  const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

  try {
    const response = await fetch(apiURL);
    allQuotes = await response.json();
    getNewQuote()
  } catch(err) {
    console.log('error')
  }
}

// Tweet a quote
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterURL, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getNewQuote);

twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes()
