
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainer = document.getElementById('question-container');
var timerEl = document.getElementById('timer');
var questionElement = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var currentScore = 0;
var timeLeft = 60;
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
  question: "This is question 1?",
  answers: [
    { text: 'a', correct: true },
    { text: 'b', correct: false },
    { text: 'c', correct: false },
    { text: 'd', correct: false },
   ]
 },
 {  
 question: "OMG you made it to question 2!",
 answers: [
   { text: '1', correct: false },
   { text: '2', correct: false },
   { text: '3', correct: true },
   { text: '4', correct: false },
 ]
 },
]



// add listener to start button
startButton.addEventListener('click', startQuiz);

// add listener to next button
nextButton.addEventListener('click', nextQuestion);

function startTimer() {

    // hide the end game container in case retarting
    endGameContainer.classList.add("hide");

    var timeInterval = setInterval(function() {
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
        button.classList.add('btn');
  
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
        currentScore ++;
        nextButton.classList.remove('hide');
    }
    else {
        console.log('my value is false');
        //lose 5 seconds for getting the wrong answer
        timeLeft=timeLeft-5;
    }
    

}

function endGame (highScoreObj) {
    console.log("you got a score of " + currentScore);
    var enteredInitials = document. querySelector("#player-intials");

    // get the high score, check if player is better, if yes reset high score 
    if (currentScore > highScoreObj.score) {

        var saveButton = document.getElementById('save-btn');
        let playerScore = currentScore;
        //display input for intials
        endGameContainer.classList.remove('hide');

        //save player score when they hit save
        saveButton.addEventListener('click', function(event) {
            event.preventDefault();

            var enteredInitials = document.querySelector("input[name='player-initials']").value;

            highScoreObj.initials = enteredInitials;
            highScoreObj.score = playerScore;

            //set new score to local storage
            localStorage.setItem("highScore", JSON.stringify(highScoreObj));

            console.log(highScoreObj);

            
        });
        
        endGameTextEl.textContent = "you got the high score!";
        endGameScoreEl.textContent = "the new high score is " + currentScore;
    }
    
    else if (currentScore === highScoreObj.score) {
        endGameContainer.classList.remove('hide');
        playerInitialsEl.classList.add('hide');
        endGameTextEl.textContent = "you tied the high score!";
        endGameScoreEl.textContent = "the high score is " + highScore.playerScore + " your score was " + currentScore;
    }

    else {
        endGameContainer.classList.remove('hide');
        playerInitialsEl.classList.add('hide');
        endGameTextEl.textContent = "you didn't get the high score.";
        endGameScoreEl.textContent = "the high score is " + highScore.playerScore + " your score was " + currentScore;
    }


    

    //hide the question, show the start button but name "restart"
    questionContainer.classList.add('hide');
    startButton.classList.remove('hide');
    startButton.textContent = "Restart"; 

    //reset the questionIndex and player score to zero
    currentQuestionIndex = 0;
    currentScore= 0;
}