let quotes = [];
let quoteContainer = document.querySelector("#quote-container");
let loader = document.querySelector("#loader");
const btn = document.querySelector("#new-quote");
const btnShareOnTwitter = document.querySelector("#twitter");
btn.addEventListener("click", () => {
  newQuote();
});
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
function newQuote() {
  loading();

  let randomN = getRandomNumber(0, quotes.length - 1);
  let quote = quotes[randomN];

  let { text, author } = quote;

  addQuote(text, author);
  setTimeout(() => {
    complete();
  }, 1000);
}
async function getQuotes(baseUrl) {
  loading();
  try {
    resp = await fetch(baseUrl);
    data = await resp.json();
    quotes = data;
    newQuote();
  } catch (err) {
    alert(err);
  }
}
function addQuote(text, author) {
  const spanAuthor = document.querySelector("#author");
  const quote = document.querySelector("#quote");
  quote.innerHTML = text;
  spanAuthor.innerHTML = author;
}
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
  console.log("Complete");
  console.log(loader.hidden, quoteContainer.hidden);
}

getQuotes("https://type.fit/api/quotes");

function shareOnTwitter() {
  const quote = document.querySelector("#quote");
  const spanAuthor = document.querySelector("#author");

  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${spanAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

btnShareOnTwitter.addEventListener("click", () => {
  shareOnTwitter();
});
