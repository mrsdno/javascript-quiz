
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainer = document.getElementById('question-container');
var timerEl = document.getElementById('timer');
var questionElement = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');
var currentScore = 0;
var timeLeft = 60;
let currentQuestionIndex = 0;

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
nextButton.addEventListener('click', nextQuestion);

function startTimer() {

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
    //hide the startbutton, and display the question container
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');

    // start the countdown timer
    startTimer();

    // display the next question
    nextQuestion();

    console.log(currentQuestionIndex);
}

function nextQuestion() {
    //clear the question container to prepare to append answer options
    clearQuestionContainer();
    displayQuestion(); 
    currentQuestionIndex ++;
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
        questionContainer.classList.add('hide');
        startButton.classList.remove('hide');
        startButton.textContent = "Restart"; 
    }
}

function clearQuestionContainer() {

    //hide next button and remove default answer options
    nextButton.classList.add('hide');
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }

}

function selectAnswer(e, timerEl) {

    const selectedButton = e.target;
    var selectedButtonCorrect = selectedButton.getAttribute("data-correct");

    if (selectedButtonCorrect === "true") {
        console.log('i am true');
        //player gets 1 point
        currentScore ++;
    }
    else {
        console.log('my value is false');
        //lose 5 seconds for getting the wrong answer
        timeLeft=timeLeft-5;
    }
    nextButton.classList.remove('hide');
}