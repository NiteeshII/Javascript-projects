const currencyone = document.querySelector(".currency-one");
const currencytwo = document.querySelector(".currency-two");
const amountone = document.querySelector(".amount-one");
const amounttwo = document.querySelector(".amount-two");
const swapbutton = document.querySelector(".swap-btn");
const exchange = document.querySelector(".exchange-rate");

async function getDatafromApi() {
  const data = await fetch("https://open.exchangerate-api.com/v6/latest");
  const result = await data.json();
  const exchangeRate =
    result.rates[currencytwo.value] / result.rates[currencyone.value];
  console.log(exchangeRate);
  exchange.innerHTML = `1${currencyone.value} = ${exchangeRate.toFixed(2)} ${
    currencytwo.value
  }`;
  amounttwo.value = amountone.value * exchangeRate.toFixed(2);
}
function swapit() {
  let temp;
  temp = currencyone.value;
  currencyone.value = currencytwo.value;
  currencytwo.value = temp;
  getDatafromApi();
}

currencyone.addEventListener("change", getDatafromApi);
currencytwo.addEventListener("change", getDatafromApi);
amountone.addEventListener("input", getDatafromApi);
amounttwo.addEventListener("input", getDatafromApi);
swapbutton.addEventListener("click", swapit);

getDatafromApi();
