/** DOM Elements */
const startScreenElement = document.getElementById("start-screen");
const questionsElement = document.getElementById("questions");
const endScreenElement = document.getElementById("end-screen");
const feedbackElement = document.getElementById("feedback");

const questionTitle = document.getElementById("question-title");
const questionChoices = document.getElementById("question-choices");

const timeElement = document.getElementById("time");
const startElement = document.getElementById("start");

/** Inputs */
let count = 6;

let questionsCount = 0;
const questionsLength = questions.length;

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

/** End Game */
const endGame = () => {
  renderPageSection(questionsElement, endScreenElement);
};

/** Global Game Timer */
const startTimer = () => {
  const interval = setInterval(() => {
    count--;
    timeElement.innerHTML = count;

    if (count === 0) {
      endGame();
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
  console.log(feedbackElement);
  if (answer === Number(id)) {
    feedbackElement.innerHTML = "correct";
  } else {
    feedbackElement.innerHTML = "wrong";
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
};

/** Event Listeners */
startElement.addEventListener("click", startHandler);
