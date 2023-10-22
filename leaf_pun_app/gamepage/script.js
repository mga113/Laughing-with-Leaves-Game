const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

async function showQuestion() {

  resetState();
  const response = await fetch('http://localhost:3000/question');
  let currentQuestion = await response.json();
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);

  }

}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    growTree();
    score++
  } else {
    selectedBtn.classList.add("incorrect");
    reverseTree();

  }
  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;

  });
  nextButton.style.display = "block";

  if (gameEnds()) {
    showScore();
  }
}

const length = 10;

function gameEnds() {
  return treeIsSwinging() || (currentQuestionIndex === length -1);
}

function treeIsSwinging() {
  const video = document.getElementById("video");
  return video.src.endsWith("tree_swinging.mp4");
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  if (treeIsSwinging()) {
    alert("You won! ")
  }
  else {
    alert("You loose")
  }
}

function handleNextButton() {
  if (currentQuestionIndex < length) {
    currentQuestionIndex++;
    showQuestion();
  }
  else {
    showScore();
  }

}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < length && !gameEnds()) {
    handleNextButton();
  }
  else {
    startQuiz();
  }
})


startQuiz();


var current_position = 5;
var questions_left = 10;
var is_correct = true;

const video = document.getElementById("video");


function growTree() {
  switch (current_position) {
    case 0:
      video.src = "./video/tree1.mp4";
      break;
    case 1:
      video.src = "./video/tree2.mp4";
      break;
    case 2:
      video.src = "./video/tree3.mp4";
      break;
    case 3:
      video.src = "./video/tree4.mp4";
      break;
    case 4:
      video.src = "./video/tree5.mp4";
      break;
    case 5:
      video.src = "./video/tree6.mp4";
      break;
    case 6:
      video.src = "./video/tree7.mp4";
      break;
    case 7:
      video.src = "./video/tree8.mp4";
      break;
    case 8:
      video.src = "./video/tree9.mp4";
      break;
    case 9:
      video.src = "./video/tree10.mp4";
      break;
    case 10:
      video.src = "./video/tree_swinging.mp4";
      video.loops = true
  }
  if (current_position < 10) current_position++;
  video.play();
}

function reverseTree() {
  switch (current_position) {
    case 0:
      break;
    case 1:
      video.src = "./video/tree1r.mp4";
      video.play();
      break;
    case 2:
      video.src = "./video/tree2r.mp4";
      video.play();
      break;
    case 3:
      video.src = "./video/tree3r.mp4";
      video.play();
      break;
    case 4:
      video.src = "./video/tree4r.mp4";
      video.play();
      break;
    case 5:
      video.src = "./video/tree5r.mp4";
      video.play();
      break;
    case 6:
      video.src = "./video/tree6r.mp4";
      video.play();
      break;
    case 7:
      video.src = "./video/tree7r.mp4";
      video.play();
      break;
    case 8:
      video.src = "./video/tree8r.mp4";
      break;
    case 9:
      video.src = "./video/tree9r.mp4";
      video.play();
      break;
    case 10:
      video.src = "./video/tree10r.mp4";
      video.play();
      break;
  }
  if (current_position > 0) current_position--;
}