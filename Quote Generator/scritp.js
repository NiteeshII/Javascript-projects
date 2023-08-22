const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading

function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

let apiQuotes = [];

// show new quote
function newQuote() {
  loading();
  // pick a random quote from apiquotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //   check if author field is blank and replace it with Unknown
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  //   check Quote length to determine styling
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
}
// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

function tweetquote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(tweetUrl, "_blank");
}

twitterBtn.addEventListener("click", tweetquote);
newQuoteBtn.addEventListener("click", newQuote);

// onload
getQuotes();
