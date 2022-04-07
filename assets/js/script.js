let timeleft = 75;
let curQuestion = 0;
let topMenu = document.getElementById("top-menu");
let viewScoreBtn = document.getElementById("high-score-btn");
let timer = document.getElementById("timer");
let quizStart = document.getElementById("quiz-start");
let startBtn = document.getElementById("start-btn");
let q1 = document.getElementById("question-1");
let q2 = document.getElementById("question-2");
let q3 = document.getElementById("question-3");
let q4 = document.getElementById("question-4");
let q5 = document.getElementById("question-5");
let rightWrong = document.getElementsByClassName("right-wrong");
let scorePage = document.getElementById("score");

let q1Options = document.getElementsByClassName("q1-op");
let q2Options = document.getElementsByClassName("q2-op");
let q3Options = document.getElementsByClassName("q3-op");
let q4Options = document.getElementsByClassName("q4-op");
let q5Options = document.getElementsByClassName("q5-op");

const answerKey = {"q1":"3. alerts", "q2":"3. parenthesis","q3":"4. all of the above","q4":"3. quotes","q5":"4. console.log"};


// function for starting the quiz
let startQuiz = function  () {
  timeleft = 75;
  curQuestion = 1;
  quizStart.style.display = "none";
  q1.style.display = "block";
}


// function to check the answer to question 1 and move to question 2
let answerQ1 = function (option) {
  if(option.textContent === answerKey.q1) {
    rightWrong[0].textContent = "Right!";
  }
  else {
    rightWrong[0].textContent = "Wrong!";
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
  }
  q5.style.display = "none";
  scorePage.style.display = "block";
  curQuestion = 6;
}

// View Score Function
let viewScore = function () {
  topMenu.style.display = "none";
  if(curQuestion == 0) {
    
  }
}

// Pressing the start quiz calls startQuiz function
startBtn.addEventListener('click',startQuiz);

// Event Listen for Question Options
for(let i = 0; i < 4; i++) {
  q1Options[i].addEventListener('click',function() {
    answerQ1(q1Options[i])}
  );

  q2Options[i].addEventListener('click',function() {
    answerQ2(q2Options[i])
  });
  q2Options[i].addEventListener('mouseover',function() {
    rightWrong[0].style.display="none";
  });
  q2Options[i].addEventListener('mouseout',function() {
    rightWrong[0].style.display="block";
  });

  q3Options[i].addEventListener('click',function() {
    answerQ3(q3Options[i])
  });
  q3Options[i].addEventListener('mouseover',function() {
    rightWrong[1].style.display="none";
  });
  q3Options[i].addEventListener('mouseout',function() {
    rightWrong[1].style.display="block";
  });

  q4Options[i].addEventListener('click',function() {
    answerQ4(q4Options[i])
  });
  q4Options[i].addEventListener('mouseover',function() {
    rightWrong[2].style.display="none";
  });
  q4Options[i].addEventListener('mouseout',function() {
    rightWrong[2].style.display="block";
  });

  q5Options[i].addEventListener('click',function() {
    answerQ5(q5Options[i])
  });
  q5Options[i].addEventListener('mouseover',function() {
    rightWrong[3].style.display="none";
  });q5Options[i].addEventListener('mouseout',function() {
    rightWrong[3].style.display="block";
  });
}
