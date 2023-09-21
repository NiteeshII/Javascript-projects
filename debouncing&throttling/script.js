const btn = document.querySelector(".icrement_btn");
const btnPress = document.querySelector(".Increment_pressed");
const count = document.querySelector(".increment_count");

var pressedCount = 0;
var triggerCount = 0;

const debounceFunction = _.debounce(() => {
  count.innerHTML = ++triggerCount;
}, 800);

const ThrottleFunction = _.throttle(() => {
  count.innerHTML = ++triggerCount;
}, 5000);

const Mydebounce = (callback, delay) => {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(callback, delay);
  };
};

const MyThrottle = (callback, delay) => {
  let last = 0;
  return function () {
    let now = new Date().getTime();
    if (now - last < delay) return;
    last = now;
    return callback();
  };
};
btn.addEventListener("click", () => {
  btnPress.innerHTML = ++pressedCount;
  ThrottleFunction();
});
