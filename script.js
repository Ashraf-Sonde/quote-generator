const quoteContainer = document.querySelector('#quote-container');
const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');

// Get quote from API
async function getQuote() {
  const proxyUrl = 'https://vast-castle-88296.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    if (data.quoteText.length > 120) {
      quote.classList.add('long-quote');
    } else {
      quote.classList.remove('long-quote');
    }
    quote.innerText = data.quoteText;

    if (data.quoteAuthor === '') {
      author.innerText = 'Anonymous';
    } else {
      author.innerText = data.quoteAuthor;
    }
  } catch (error) {
    getQuote();
    console.log('Failed to fetch Quote!', error);
  }
}

// Tweet Quote
function tweetQuote() {
 const quoteText = quote.innerText;
 const authorText = author.innerText;
 const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorText}`;
 window.open(twitterUrl, '_blank');
}

twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', getQuote);

// Onload 
getQuote();
