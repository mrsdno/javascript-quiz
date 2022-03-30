
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainer = document.getElementById('question-container');
var timerEl = document.getElementById('timer');
var questionElement = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var currentScore = 0;
var timeInterval;
var startTime = 60;
var timeLeft;
let currentQuestionIndex = 0;
var endGameContainer = document.getElementById('end-game');
var playerInitialsEl = document.getElementById('player-initials-el');
var endGameTextEl = document.getElementById('end-game-text');
var endGameScoreEl = document.getElementById('end-game-score');

var highScoreObj = {
    initials: null,
    score: 0
}

const questions = [
 {
  question: "Which built-in method combines the text of two strings and returns a new string??",
  answers: [
    { text: 'append()', correct: false },
    { text: 'concat()', correct: true },
    { text: 'attach()', correct: false },
    { text: 'None of the above', correct: false },
   ]
 },

 {  
 question: "Which built-in method reverses the order of the elements of an array?",
 answers: [
   { text: 'changeOrder(order)', correct: false },
   { text: 'sort(order)', correct: false },
   { text: 'reverse()', correct: true },
   { text: 'None of the above', correct: false },
 ]
 },

 {  
    question: "When a user views a page containing a JavaScript program, which machine actually executes the script?",
    answers: [
      { text: "The User's machine running a Web browser", correct: true },
      { text: 'The Web server', correct: false },
      { text: "A central machine deep within Netscape's corporate offices", correct: false },
      { text: 'None of the above', correct: false },
    ]
    },
]



// add listener to start button
startButton.addEventListener('click', startQuiz);

// add listener to next button
nextButton.addEventListener('click', nextQuestion);

function startTimer() {

    timeLeft = startTime

    // hide the end game container in case retarting
    endGameContainer.classList.add("hide");

    timeInterval = setInterval(function() {
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + ' seconds remaining';
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else {
            timerEl.textContent = '';
            clearInterval(timeInterval);
            timerEl.textContent = "Time's up!";
            questionContainer.classList.add('hide');
            questionContainer.classList.add('hide');
            endGameContainer.classList.remove('hide');
            endGameScoreEl.classList.add('hide');
            playerInitialsEl.classList.add('hide');
            endGameTextEl.textContent = "You ran out of time!";
            restartGame();
        }
    }, 1000);


}


function startQuiz() {

    startTimer();

    displayQuestion();

    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');

}

function nextQuestion() {
    //clear the question container to prepare to append answer options
    clearQuestionContainer();
    currentQuestionIndex ++;
    displayQuestion(); 
    console.log(currentQuestionIndex);
}

function displayQuestion() {
      //question if current index < index length
    
    if (currentQuestionIndex < questions.length) {
    let question = questions[currentQuestionIndex].question;
    questionElement.textContent = question;
    
  
    //loop through answer options and append them to the container
    questions[currentQuestionIndex].answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn-answer');

  
        //assign a string to the correct answer if it is selected
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        //call select answer function if button is clicked 
        button.addEventListener('click', selectAnswer);

  
        answerButtonsEl.appendChild(button);
      })
    }
        else {
            endGame(highScoreObj);
        }
}

function clearQuestionContainer() {

    //hide next button and remove old answer options
    nextButton.classList.add('hide');
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }

}

function selectAnswer(e) {

    const selectedButton = e.target;
    var selectedButtonCorrect = selectedButton.getAttribute("data-correct");

    if (selectedButtonCorrect === "true") {
        console.log('i am true');
        //player gets 1 point
        nextButton.classList.remove('hide');
    }
    else {
        console.log('my value is false');
        //lose 5 seconds for getting the wrong answer
        timeLeft=timeLeft-5;
    }
    

}

function endGame (highScoreObj) {
    
    // stop the timer
    clearInterval(timeInterval);

    //set currentScore to the time left
    currentScore = timeLeft;

    // get high score from local storage
    var highestScore = JSON.parse(localStorage.getItem("highScore"));



    // get the high score, check if player is better, if yes reset high score 
    if (highScoreObj.initials === null) { 
        newHighScore();
    }

    else if (currentScore > highestScore.score) {
        newHighScore();
    }
    
    else if (currentScore === highestScore.score) {
        endGameContainer.classList.remove('hide');
        playerInitialsEl.classList.add('hide');
        endGameTextEl.textContent = "you tied the high score!";
        endGameScoreEl.textContent = "the high score is " + highestScore.score + " your score was " + currentScore;
        restartGame();
    }

    else {
        endGameContainer.classList.remove('hide');
        playerInitialsEl.classList.add('hide');
        endGameTextEl.textContent = "you didn't get the high score.";
        endGameScoreEl.textContent = "the high score is " + highestScore.score + " your score was " + currentScore;
        restartGame();
    }
}

function newHighScore () {
    var saveButton = document.getElementById('save-btn');
    var playerScore = currentScore;

    //display input for intials
    endGameContainer.classList.remove('hide');
    playerInitialsEl.classList.remove('hide');
    questionContainer.classList.add('hide');

    //save player score when they hit save
    saveButton.addEventListener('click', function(event) {
        event.preventDefault();
        //hide the initals input
        playerInitialsEl.classList.add('hide');
        endGameContainer.classList.add('hide');
        var enteredInitials = document.querySelector("input[name='player-initials']").value;

        highScoreObj.initials = enteredInitials;
        highScoreObj.score = playerScore;

        //set new score to local storage
        localStorage.setItem("highScore", JSON.stringify(highScoreObj));

        restartGame();
    });

    endGameTextEl.textContent = "you got the high score!";
    endGameScoreEl.textContent = "the new high score is " + currentScore;
}


function restartGame() {

    if (timeLeft > 0) {
    //hide the question, show the start button but name "restart"
    questionContainer.classList.add('hide');
    startButton.classList.remove('hide');
    startButton.textContent = "Restart"; 

    //reset the questionIndex, player score and timeLeft
    currentQuestionIndex = 0;
    currentScore= 0;
    timeLeft=60;
    }

    else {
        clearQuestionContainer();

        startButton.classList.remove('hide');
        startButton.textContent = "Restart"; 
        currentQuestionIndex = 0;
        currentScore= 0;
        timeLeft = startTime;
    }
}
