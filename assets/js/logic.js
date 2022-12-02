/** DOM Elements */
const startScreenElement = document.getElementById("start-screen");
const questionsElement = document.getElementById("questions");
const endScreenElement = document.getElementById("end-screen");

const timeElement = document.getElementById("time");
const startElement = document.getElementById("start");

/** Inputs */
let count = 6;

/** Timer */
const startTimer = () => {
  const interval = setInterval(() => {
    count--;
    timeElement.innerHTML = count;

    if (count === 0) {
      startScreenElement.classList.add("hide");
      endScreenElement.classList.remove("hide");
      clearInterval(interval);
      return;
    }
  }, 1000);
};

/** Start */
const startHandler = () => {
  startTimer();
};

/** Event Listeners */
startElement.addEventListener("click", startHandler);
