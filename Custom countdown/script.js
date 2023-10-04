const Inputform = document.querySelector(".form");
const Submitbutton = document.getElementById("form-submit");
const dateInput = document.getElementById("date");
const inputContainer = document.querySelector(".Input-container");
const countdownContainer = document.querySelector(".countdown");
const completecontainer = document.querySelector(".complete");
const countdownTitle = document.getElementById("countdown-title");
const completeTitle = document.getElementById("complete-info");
const timeElements = document.querySelectorAll("span");
const ResetBtn = document.getElementById("Reset");
const completebtn = document.getElementById("complete-btn");

let today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);

console.log(timeElements);
const seconds = 1000;
const minutes = seconds * 60;
const hours = minutes * 60;
const days = hours * 24;

let countdownInput = "";
let countdownDate = "";
let countdownValue = Date;
let savedCountdown;
let countdownInterval;

function updateDOM() {
  countdownInterval = setInterval(() => {
    let now = new Date().getTime();
    const distance = countdownValue - now;
    const day = Math.floor(distance / days);
    const hour = Math.floor((distance % days) / hours);
    const minute = Math.floor((distance % hours) / minutes);
    const second = Math.floor((distance % minutes) / seconds);
    inputContainer.hidden = true;
    console.log(distance);
    if (distance < 0) {
      countdownContainer.hidden = true;
      completeTitle.textContent = ` ${countdownInput} finished ${countdownDate} `;
      completecontainer.hidden = false;
    } else {
      countdownTitle.textContent = `${countdownInput}`;
      countdownContainer.hidden = false;
      timeElements[0].innerHTML = `${day}`;
      timeElements[1].innerHTML = `${hour}`;
      timeElements[2].innerHTML = `${minute}`;
      timeElements[3].innerHTML = `${second}`;
    }
  }, seconds);
}

function updateCountDown(e) {
  e.preventDefault();
  countdownInput = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  console.log(countdownInput, countdownDate);
  savedCountdown = {
    title: countdownInput,
    date: countdownDate,
  };
  localStorage.setItem("savedCountdown", JSON.stringify(savedCountdown));

  if (countdownDate === "") {
    alert("Please enter the date");
  } else {
    countdownValue = new Date(countdownDate).getTime();
  }

  updateDOM();
}

function handleReset() {
  countdownContainer.hidden = true;
  completecontainer.hidden = true;
  inputContainer.hidden = false;

  localStorage.removeItem("savedCountdown");
  clearInterval(countdownInterval);
}

function onLoadLoacalSotrage() {
  const savedData = JSON.parse(localStorage.getItem("savedCountdown"));
  if (savedData) {
    inputContainer.hidden = true;
    completecontainer.hidden = true;
    countdownContainer.hidden = false;
  }
  countdownInput = savedData.title;
  countdownDate = savedData.date;
  countdownValue = new Date(countdownDate).getTime();

  console.log(savedData);

  updateDOM();
}

Inputform.addEventListener("submit", updateCountDown);
ResetBtn.addEventListener("click", handleReset);
completebtn.addEventListener("click", handleReset);

onLoadLoacalSotrage();
