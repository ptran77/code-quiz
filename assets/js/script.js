let timeLeft = 0; //time left in seconds
let timeInterval; // a timer to run in the background
let quizRun = false; // indicator that for currently in the quiz
let scores = []; // list of scores

// keeps track of which page we are on 
// 0 for start page, 1 for question 1, 2 for question 2, 3 for question 3, 4 for question 4, 5 for question 5, and 6 for score page
let curQuestion = 0;

let topMenu = document.getElementById("top-menu");
let viewScoreBtn = document.getElementById("high-score-btn");
let timer = document.getElementById("timer");

// Start Page and its elements
let quizStart = document.getElementById("quiz-start");
let startBtn = document.getElementById("start-btn");

// Question Pages
let q1 = document.getElementById("question-1");
let q2 = document.getElementById("question-2");
let q3 = document.getElementById("question-3");
let q4 = document.getElementById("question-4");
let q5 = document.getElementById("question-5");

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

// container containing all the options of a specifc question
let q1Options = document.querySelector(".q1-options");
let q2Options = document.querySelector(".q2-options");
let q3Options = document.querySelector(".q3-options");
let q4Options = document.querySelector(".q4-options");
let q5Options = document.querySelector(".q5-options");

// arrays that contains the option divs
let q1Option = document.getElementsByClassName("q1-option");
let q2Option = document.getElementsByClassName("q2-option");
let q3Option = document.getElementsByClassName("q3-option");
let q4Option = document.getElementsByClassName("q4-option");
let q5Option = document.getElementsByClassName("q5-option");

const answerKey = {"q1":"3. alerts", "q2":"3. parenthesis","q3":"4. all of the above","q4":"3. quotes","q5":"4. console.log"};


// function for starting the quiz
let startQuiz = function  () {
  timeLeft = 75;
  quizRun = true;
  timeInterval = setInterval(function(){
    timer.textContent = "Time: " + timeLeft;
    if(timeLeft == 0) {
      clearInterval(timeInterval);
      quizRun = false;
      q1.style.display = "none";
      q2.style.display = "none";
      q3.style.display = "none";
      q4.style.display = "none";
      q5.style.display = "none";
      rightWrong[4].textContent = "";
      scorePage.style.display = "block";
      curQuestion = 6;
    }
    timeLeft--;
  }, 1000);
  
  curQuestion = 1;
  quizStart.style.display = "none";
  q1.style.display = "block";
}

// Wrong Answer function

let wrongAnswer = function() {
  if(timeLeft < 10) timeLeft = 0;
  else timeLeft -= 10;
  timer.textContent = "Time: " + timeLeft;
}

// function to check the answer to question 1 and move to question 2
let answerQ1 = function (option) {
  if(option.textContent === answerKey.q1) {
    rightWrong[0].textContent = "Right!";
  }
  else {
    rightWrong[0].textContent = "Wrong!";
    wrongAnswer();
  }
  q1.style.display = "none";
  q2.style.display = "block";
  curQuestion = 2;
}

// function to check the answer to question 2 and move to question 3
let answerQ2 = function(option) {
  if(option.textContent === answerKey.q2) {
    rightWrong[1].textContent = "Right!";
  }
  else {
    rightWrong[1].textContent = "Wrong!";
    wrongAnswer();
  }
  q2.style.display = "none";
  q3.style.display = "block";
  curQuestion = 3
}

// function to check the answer to question 3 and move to question 4
let answerQ3 = function(option) {
  if(option.textContent === answerKey.q3) {
    rightWrong[2].textContent = "Right!";
  }
  else {
    rightWrong[2].textContent = "Wrong!";
    wrongAnswer();
  }
  q3.style.display = "none";
  q4.style.display = "block";
  curQuestion = 4;
}

// function to check the answer to question 4 and move to question 5
let answerQ4 = function(option) {
  if(option.textContent === answerKey.q4) {
    rightWrong[3].textContent = "Right!";
  }
  else {
    rightWrong[3].textContent = "Wrong!";
    wrongAnswer();
  }
  q4.style.display = "none";
  q5.style.display = "block";
  curQuestion = 5;
}

// function to check the answer to question 5 and move to score page
let answerQ5 = function(option) {
  if(option.textContent === answerKey.q5) {
    rightWrong[4].textContent = "Right!";
  }
  else {
    rightWrong[4].textContent = "Wrong!";
    wrongAnswer();
  }
  q5.style.display = "none";
  scorePage.style.display = "block";
  curQuestion = 6;
  // stop the timer if there is still time left
  if(timeLeft > 0) {
    clearInterval(timeInterval);
    quizRun = false;
  }
  yourScore.textContent = "Your final score is " + timeLeft;
}

// View Score Function
let viewScore = function () {
  // pause timer if the quiz is running
  if(quizRun) {
    clearInterval(timeInterval);
  }
  topMenu.style.display = "none";
  quizStart.style.display = "none";
  q1.style.display = "none";
  q2.style.display = "none";
  q3.style.display = "none";
  q4.style.display = "none";
  q5.style.display = "none";
  scorePage.style.display = "none";
  highScoresPage.style.display = "block";
}

// Go Back Function
let goBack = function () {
  highScoresPage.style.display = "none";
  topMenu.style.display = "flex";
  if(curQuestion == 0) {
    quizStart.style.display = "block";
  }
  else if(curQuestion == 1) {
    q1.style.display = "block";
  }
  else if(curQuestion == 2) {
    q2.style.display = "block";
  }
  else if(curQuestion == 3) {
    q3.style.display = "block";
  }
  else if(curQuestion == 4) {
    q4.style.display = "block";
  }
  else if(curQuestion == 5) {
    q5.style.display = "block";
  }
  else
    scorePage.style.display = "block";

  // in the middle of the quiz, resume timer
  if(quizRun) {
    timeInterval = setInterval(function(){
      timer.textContent = "Time: " + timeLeft;
      if(timeLeft == 0) {
        clearInterval(timeInterval);
        quizRun = false;
        q1.style.display = "none";
        q2.style.display = "none";
        q3.style.display = "none";
        q4.style.display = "none";
        q5.style.display = "none";
        rightWrong[4].textContent = "";
        scorePage.style.display = "block";
        curQuestion = 6;
      }
      timeLeft--;
    }, 1000);
  }
}


// Submit Score function
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
  if(scores == []) return
  else {
    for(let i = 0; i < scores.length; i++) {
      let scoreListItem = document.createElement('div');
      scoreListItem.classList.add("score-list-item");
      scoreListItem.textContent = i+1 + ". " + scores[i].name + " - " + scores[i].score;
      scoreList.appendChild(scoreListItem);
    }
  }
}

// Event Listeners

// Pressing the start quiz calls startQuiz function
startBtn.addEventListener('click',startQuiz);

// event listeners for question options
q1Options.addEventListener("click", function(event) {
  let option = event.target;
  answerQ1(option);
})

q2Options.addEventListener("click", function(event) {
  let option = event.target;
  answerQ2(option);
})

q3Options.addEventListener("click", function(event) {
  let option = event.target;
  answerQ3(option);
})

q4Options.addEventListener("click", function(event) {
  let option = event.target;
  answerQ4(option);
})

q5Options.addEventListener("click", function(event) {
  let option = event.target;
  answerQ5(option);
})

// event listeners for when mouse is over an option, the right/wrong message will disappear
// and when mouse is not over an option, the right/wrong message is still there
for(let i = 0; i < 4; i++) {
  q2Option[i].addEventListener("mouseover", function() {
    rightWrong[0].style.display = "none";
  })
  q2Option[i].addEventListener("mouseout", function() {
    rightWrong[0].style.display = "block";
  })
  q3Option[i].addEventListener("mouseover", function() {
    rightWrong[1].style.display = "none";
  })
  q3Option[i].addEventListener("mouseout", function() {
    rightWrong[1].style.display = "block";
  })
  q4Option[i].addEventListener("mouseover", function() {
    rightWrong[2].style.display = "none";
  })
  q4Option[i].addEventListener("mouseout", function() {
    rightWrong[2].style.display = "block";
  })
  q5Option[i].addEventListener("mouseover", function() {
    rightWrong[3].style.display = "none";
  })
  q5Option[i].addEventListener("mouseout", function() {
    rightWrong[3].style.display = "block";
  })
}

submitBtn.addEventListener("mouseover", function() {
  rightWrong[4].style.display = "none";
})

submitBtn.addEventListener("mouseout", function() {
  rightWrong[4].style.display = "block";
})

// event listener to see the high scores list
viewScoreBtn.addEventListener("click", viewScore);

// event listener to go from the high scores back to the previous page
goBackBtn.addEventListener("click", goBack);

submitBtn.addEventListener("click",submitScore);

window.onload = function() {
  scores = JSON.parse(localStorage.getItem("scores"));
  addScoresToList();
}