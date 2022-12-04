/** DOM Elements */
const startScreenElement = document.getElementById("start-screen");
const questionsElement = document.getElementById("questions");
const endScreenElement = document.getElementById("end-screen");
const feedbackElement = document.getElementById("feedback");
const finalScoreElement = document.getElementById("final-score");

const questionTitle = document.getElementById("question-title");
const questionChoices = document.getElementById("question-choices");

const timeElement = document.getElementById("time");
const startElement = document.getElementById("start");
const submitElement = document.getElementById("submit");
const initialsElement = document.getElementById("initials");

const errorElement = document.getElementById("error");

/** Inputs */
let count = 60;
const countCharge = 3;

let questionsCount = 0;
const questionsLength = questions.length;

let state = {
  initials: "",
  correctAnswers: 0,
  wrongAnswers: 0,
  score: 0,
};

let currentHighScore = {};

let killSwitch = true;

/** Init Screen */
const init = () => {
  timeElement.innerHTML = count;
};

init();

/** Toggle element */
const renderPageSection = (elementToHide, elementToRender) => {
  elementToHide.classList.add("hide");
  elementToRender.classList.remove("hide");
};

/** Clear timer */
const clearTimer = () => {
  count = 0;
  timeElement.innerHTML = count;
};

/** End Game */
const endGame = () => {
  renderPageSection(questionsElement, endScreenElement);
};

/** Global Game Timer */
const startTimer = () => {
  const interval = setInterval(() => {
    count--;
    timeElement.innerHTML = count;

    if (count === 0 || count < 0) {
      endGame();
      clearTimer();
      clearInterval(interval);
      return;
    }
  }, 1000);
};

/** Destroy question */
const destroyQuestion = () => {
  questionTitle.innerHTML = "";
  questionChoices.innerHTML = "";
};

/** Hide & Show Feedback element */
const hideFeedback = () => {
  feedbackElement.classList.add("hide");
};

const showFeedback = () => {
  feedbackElement.classList.remove("hide");
};

/** Check Answer */
const checkAnswer = (id, answer) => {
  showFeedback();
  if (answer === Number(id)) {
    feedbackElement.innerHTML = "correct";
    state.correctAnswers++;
  } else {
    feedbackElement.innerHTML = "wrong";
    count = count - countCharge;
    state.wrongAnswers++;
  }
};

/** Display Score */
const displayScore = () => {
  const finalScore = state.correctAnswers * 3;
  finalScoreElement.innerHTML = finalScore;
  state.score = finalScore;
};

/** High Score */
const saveScore = () => {
  currentHighScore.initials = state.initials;
  currentHighScore.score = state.score;

  if (!localStorage.getItem("highScores")) {
    localStorage.setItem("highScores", JSON.stringify([currentHighScore]));
  } else {
    let highScores = JSON.parse(localStorage.getItem("highScores"));
    highScores.push(currentHighScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }
};

/** Build Question Element */
const buildQuestion = (question) => {
  const { title, answer, choices } = question;

  questionTitle.innerHTML = title;

  choices.forEach((choice, index) => {
    const questionElement = document.createElement("button");
    questionElement.setAttribute("id", index);
    questionElement.innerHTML = choice;
    questionElement.addEventListener("click", (event) => {
      const { id } = event.target;

      questionsCount++;

      checkAnswer(id, answer);

      const questionTimeout = setTimeout(() => {
        if (questionsCount !== questionsLength) {
          destroyQuestion();
          buildQuestion(questions[questionsCount]);
        } else {
          renderPageSection(questionsElement, endScreenElement);
          hideFeedback();
          clearTimer();
          displayScore();
        }
      }, 300);
    });

    hideFeedback();

    questionChoices.appendChild(questionElement);
  });
};

/** Render Questions */
const renderQuestions = () => {
  renderPageSection(startScreenElement, questionsElement);
  buildQuestion(questions[questionsCount]);
};

/** Start Quiz */
const startHandler = () => {
  startTimer();
  renderQuestions();
  displayScore();
};

/** Initials handler */
const initialsHandler = (event) => {
  const { value } = event.target;
  if (value) {
    killSwitch = false;
    errorElement.classList.add("hide");
    state.initials = value.toUpperCase();
  }
};

/** Submit score */
const submitHandler = () => {
  if (killSwitch) {
    errorElement.classList.remove("hide");
    return;
  }
  saveScore();
  globalThis.location.href = "./highscores.html";
};

/** Event Listeners */
startElement.addEventListener("click", startHandler);
initialsElement.addEventListener("keyup", initialsHandler);
submitElement.addEventListener("click", submitHandler);
