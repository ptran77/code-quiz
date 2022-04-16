let timeLeft = 0; //time left in seconds
let timeInterval; // a timer to run in the background
let quizRun = false; // indicator that for currently in the quiz
let scores = []; // list of scores

//1 for question 1, 2 for question 2, 3 for question 3, 4 for question 4, 5 for question 5
let curQuestion = 0;

let topMenu = document.getElementById("top-menu");
let viewScoreBtn = document.getElementById("high-score-btn");
let timer = document.getElementById("timer");

// Start Page and its elements
let startPage = document.getElementById("start-page");
let startBtn = document.getElementById("start-btn");

// Question Page and elements
let questionPage = document.getElementById("question-page");
let question = document.getElementById("question");
let options = document.getElementsByClassName("option");
let rightWrong = document.getElementsByClassName("right-wrong");

// Score Page and its Element
let scorePage = document.getElementById("score");
let yourScore = document.getElementById("your-score");
let submitBtn = document.getElementById("submit-btn");
let scoreList = document.getElementById("score-list");

// High score page and its elements
let highScoresPage = document.getElementById("high-score");
let goBackBtn = document.getElementById("go-back");
let clearScoresBtn = document.getElementById("clear-scores");

const quizQuestions = [
  {question: "Commonly used data types DO Not Include:", option1: "1. strings", option2: "2. booleans", option3: "3. alerts", option4: "4. numbers"}, 
  {question: "The condition in an if / else statement is enclosed with ________.", option1: "1. quotes", option2: "2. curly brackets", option3: "3. parenthesis", option4: "4. square brackets"},
  {question: "Arrays in JavaScript can be used to store ________.", option1: "1. numbers and strings", option2: "2. other arrays", option3: "3. booleans", option4: "4. all of the above"},
  {question: "String values must be enclosed within ________ when being assigned to variables.", option1: "1. commas", option2: "2. curly brackets", option3: "3. quotes", option4: "4. parenthesis"},
  {question: "A very useful tool used during development and debugging for printing content to the debugger is:", option1: "1. JavaScript", option2: "2. terminal/bash", option3: "3. for loops", option4: "4. console.log"}
];

const answerKey = ["3. alerts", "3. parenthesis","4. all of the above","3. quotes","4. console.log"];

// Start Quiz Function
let startQuiz = function  () {
  yourScore.textContent = "Your final score is 0";
  timeLeft = 75;
  quizRun = true;
  rightWrong[0].textContent = "";
  rightWrong[1].textContent = "";
  timeInterval = setInterval(function(){
    timer.textContent = "Time: " + timeLeft;
    if(timeLeft == 0) {
      clearInterval(timeInterval);
      quizRun = false;
      questionPage.style.display = "none";
      rightWrong[1].textContent = "";
      scorePage.style.display = "block";
      curQuestion = 6;
    }
    timeLeft--;
  }, 1000);

  curQuestion = 1;
  startPage.style.display = "none";
  renderQuestion();
  questionPage.style.display = "block";
}


// Rendering question function
let renderQuestion = function () {
  if(curQuestion === 6) {
    quizRun = false;
    scorePage.style.display = "block";
    questionPage.style.display = "none";
    clearInterval(timeInterval);
    yourScore.textContent = "Your final score is " + timeLeft;
  }
  else {
    question.textContent = quizQuestions[curQuestion-1].question;
    options[0].textContent =  quizQuestions[curQuestion-1].option1;
    options[1].textContent =  quizQuestions[curQuestion-1].option2;
    options[2].textContent =  quizQuestions[curQuestion-1].option3;
    options[3].textContent =  quizQuestions[curQuestion-1].option4;
  }

}

// Wrong Answer function

let wrongAnswer = function() {
  if(timeLeft < 10) timeLeft = 0;
  else timeLeft -= 10;
  timer.textContent = "Time: " + timeLeft;
}
// Checking answer with answerkey
let checkAnswer = function(option) {
  if(option.textContent == answerKey[curQuestion-1]){
    rightWrong[0].textContent = "Right!";
    rightWrong[1].textContent = "Right!";
  }
  else {
    rightWrong[0].textContent = "Wrong!";
    rightWrong[1].textContent = "Wrong";
    wrongAnswer();
  }

  curQuestion++;
  renderQuestion();
}

// Function to sort scores from greatest to least
let sortScores = function () {
  if(scores == []) return
  if(scores.length > 1) {
    for(let i = 0; i < scores.length; i++) {
      let highest = i;
      for(let j = i+1; j < scores.length; j++){
        if(scores[highest].score < scores[j].score) {
          highest = j;
        }
      }
      let highestScorer = scores[highest];
      scores[highest] = scores[i];
      scores[i] = highestScorer;
    }
  }
  localStorage.setItem("scores", JSON.stringify(scores));
}

// Adding scores to scorelist
let addScoresToList = function() {
  scoreList.textContent = "";
  if(!scores || scores == []) {
    scores = [];
    return;
  }
  else {
    for(let i = 0; i < scores.length; i++) {
      let scoreListItem = document.createElement('div');
      scoreListItem.classList.add("score-list-item");
      scoreListItem.textContent = i+1 + ". " + scores[i].name + " - " + scores[i].score;
      scoreList.appendChild(scoreListItem);
    }
  }
}

// Submitting scores
let submitScore = function() {
  let initials = document.getElementById("initials");
  if(initials.value.length != 2) {
    window.alert("Expected initials. Try Again");
  }
  else {
    let scoreDataObj = {name: initials.value, score: timeLeft};
    scores.push(scoreDataObj);
    sortScores();
    addScoresToList();
    timer.textContent = "Time: 0";
    topMenu.style.display = "none";
    scorePage.style.display = "none";
    highScoresPage.style.display = "block";
    curQuestion = 0;
  }
  initials.value = "";
}

// View Score Function
let viewScore = function () {
  // pause timer if the quiz is running
  if(quizRun) {
    clearInterval(timeInterval);
  }
  topMenu.style.display = "none";
  startPage.style.display = "none";
  questionPage.style.display = "none";
  scorePage.style.display = "none";
  highScoresPage.style.display = "block";
}

// Go Back Function
let goBack = function () {
  highScoresPage.style.display = "none";
  topMenu.style.display = "flex";
  if(curQuestion == 0) {
    startPage.style.display = "block";
  }
  else if(curQuestion == 6) {
    scorePage.style.display = "block";
  }
  else {
    questionPage.style.display = "block";
  }

  // in the middle of the quiz, resume timer
  if(quizRun) {
    timeInterval = setInterval(function(){
      timer.textContent = "Time: " + timeLeft;
      if(timeLeft == 0) {
        clearInterval(timeInterval);
        quizRun = false;
        questionPage.style.display = "none";
        rightWrong[1].textContent = "";
        scorePage.style.display = "block";
        curQuestion = 6;
      }
      timeLeft--;
    }, 1000);
  }
}

// clear scores function
let clearScores = function() {
  scoreList.textContent = "";
  scores = [];
  localStorage.setItem("scores", JSON.stringify(scores));
}

// Event Listeners

// Pressing the start quiz calls startQuiz function
startBtn.addEventListener('click',startQuiz);

for(let i = 0; i < 4; i++) {
  options[i].addEventListener("click",function(event) {
    option = event.target
    checkAnswer(option);
  });
  options[i].addEventListener("mouseout", function() {
    rightWrong[0].style.display = "block";
  })
  options[i].addEventListener("mouseover", function() {
    rightWrong[0].style.display = "none";
  })
}

// event listener to see the high scores list
viewScoreBtn.addEventListener("click", viewScore);

// event listener to go from the high scores back to the previous page
goBackBtn.addEventListener("click", goBack);

submitBtn.addEventListener("click",submitScore);

submitBtn.addEventListener("mouseout", function() {
  rightWrong[1].style.display = "block";
});

submitBtn.addEventListener("mouseover", function() {
  rightWrong[1].style.display = "none";
});

clearScoresBtn.addEventListener("click", clearScores);

window.onload = function() {
  scores = JSON.parse(localStorage.getItem("scores"));
  addScoresToList();
}