const progressContainer = document.querySelector(".ProgressBar-Container");
const buttonclick = document.querySelector(".Progress-Run");
const progressBar = document.querySelector(".progress-Bar");

let progressCount = 0;
let progressCountArray = [];
buttonclick.innerHTML = `Run ${progressCountArray.length}`;

function createElement() {
  const newbar = document.createElement("div");
  newbar.className = "progress-Bar";
  newbar.id = "progress-Bar";

  return newbar;
}

function startAnimation() {
  const progressBar = createElement();
  progressContainer.appendChild(progressBar);
  progressBar.style.animation = "fillProgress 3s ease-in-out forwards";
  progressBar.addEventListener("animationend", () => {
    progressBar.style.animation = "none";
    progressContainer.removeChild(progressBar);
    progressCountArray.shift();
    buttonclick.innerHTML = `Run ${progressCountArray.length}`;
    if (progressCountArray.length > 0) {
      startAnimation();
    }
  });
}

const handleBtnClick = () => {
  progressCount++;
  progressCountArray.push(progressCount);
  buttonclick.innerHTML = `Run ${progressCountArray.length}`;
  if (progressCountArray.length === 1) {
    startAnimation();
  }
};

buttonclick.addEventListener("click", handleBtnClick);
