const highscoresElement = document.getElementById("highscores");
const clearElement = document.getElementById("clear");

const highScores = JSON.parse(localStorage.getItem("highScores"));

highScores.forEach((highScore) => {
  const element = document.createElement("li");
  element.innerHTML = `${highScore.initials} - ${highScore.score}`;
  highscoresElement.appendChild(element);
});

clearElement.addEventListener("click", () => {
  localStorage.clear();
  highscoresElement.innerHTML = "";
});
