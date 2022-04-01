
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainer = document.getElementById('question-container');
var timerEl = document.getElementById('timer');
var questionElement = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var highScoreEl = document.getElementById('high-score');
var currentScore = 0;
var timeInterval;
var startTime = 60;
var timeLeft;
let currentQuestionIndex = 0;
var endGameContainer = document.getElementById('end-game');
var playerInitialsEl = document.getElementById('player-initials-el');
var endGameTextEl = document.getElementById('end-game-text');
var endGameScoreEl = document.getElementById('end-game-subtext');

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

{  
 question: "Javascript is an _______ language?",
 answers: [
    { text: "Object-Based", correct: false },
    { text: 'Procedural', correct: false },
    { text: "Object Oriented", correct: true },
    { text: 'None of the above', correct: false },
    ]
},
{  
 question: "Which of the following keywords is used to define a variable in Javascript?",
 answers: [
    { text: "var", correct: false },
    { text: 'let', correct: false },
    { text: "both var and let", correct: true },
    { text: 'None of the above', correct: false },
    ]
   },


]

// function to display high score
function displayHighScore() {
    var highestScore = JSON.parse(localStorage.getItem("highScore"));

    // do not display if no high score
    if (highestScore === null) {
    }

    else {
        highScoreEl.textContent = "High Score: " + highestScore.initials + " " + highestScore.score;
    }
}

//display the high score on page load
window.onload = function() {
    displayHighScore();

}

// add listener to start button
startButton.addEventListener('click', startQuiz);

// add listener to next button
nextButton.addEventListener('click', nextQuestion);

function startTimer() {
    displayHighScore();
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
}

function displayQuestion() {
      //question if current index < index length
    
    if (currentQuestionIndex < questions.length) {
        //show the question and answer elements
        answerButtonsEl.classList.remove('hide');
        questionElement.classList.remove('hide');
        //assign question to current question index
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
    const minusFiveSeconds=document.createElement('p');
    minusFiveSeconds.classList.add('time-lost')


    if (selectedButtonCorrect === "true") {
        console.log('i am true');
        //show next button
        nextButton.classList.remove('hide');
        answerButtonsEl.classList.add('hide');
        questionElement.classList.add('hide');
    }
    else {
        console.log('my value is false');
        //lose 5 seconds for getting the wrong answer
        timeLeft=timeLeft-5;
        minusFiveSeconds.textContent ='-5 seconds! Try Again!';
        questionContainer.appendChild(minusFiveSeconds);
        setTimeout(function(){
            minusFiveSeconds.remove()}, 1000);
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
    if (highestScore == null) { 
        newHighScore();
    }

    else if (currentScore > highestScore.score) {
        newHighScore();
    }
    
    else if (currentScore === highestScore.score) {
        timerEl.textContent= "";
        endGameContainer.classList.remove('hide');
        playerInitialsEl.classList.add('hide');
        endGameTextEl.textContent = "You tied the high score!";
        endGameScoreEl.textContent = "Click the button below to try again to beat the high score!";
        restartGame();
    }

    else {
        timerEl.textContent= "";
        endGameContainer.classList.remove('hide');
        playerInitialsEl.classList.add('hide');
        endGameTextEl.textContent = "Darn! You didn't beat the high score.";
        endGameScoreEl.textContent = "The high score is " + highestScore.score + " your score was " + currentScore + ". Try again to beat the high score!";
        restartGame();
    }
}

function newHighScore () {
    var saveButton = document.getElementById('save-btn');
    var playerScore = currentScore;

    // hide the other junk in the container box and the timer
    timerEl.textContent= "";
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

        displayHighScore();
    });

    endGameTextEl.textContent = "Wow!! You got the new high score: " + currentScore + "!";
    endGameScoreEl.textContent = "Enter your initials below and save your score. After you save, try again to beat your high score!";

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
