
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var questionContainer = document.getElementById('question-container');
var timerEl = document.getElementById('timer');
var questionElement = document.getElementById('question');
var answerButtonsEl = document.getElementById('answer-buttons');

const questions = [
 {
  question: "This is question 1?",
  answers: [
    { text: 'a', correct: true },
    { text: 'b', correct: false },
    { text: 'c', correct: false },
    { text: 'd', correct: false },
   ]
 }
]


// add listener to start button
startButton.addEventListener('click', startQuiz);


function startQuiz() {
    //hide the startbutton, and display the question container
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');

    // display the next question
    nextQuestion();

    // start the countdown timer
    startTimer();
}

function nextQuestion() {
    //clear the question container to prepare to append answer options
    clearQuestionContainer();

    //display the first question
    let question = questions[0].question;
    questionElement.textContent = question;

    //loop through answer options and append them to the container
    questions[0].answers.forEach(answer => {
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

function clearQuestionContainer() {

    //hide next button and remove default answer options
    nextButton.classList.add('hide');
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

function selectAnswer() {

}

function startTimer() {
    
    //set time to 60 seconds
    var timeLeft = 60;

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



// var displayQuestion = function () {
    

//     for(var i=0; i < quizQuestions.length; i++) {
//         var displayQuestionEl = document.createElement("div");
//         displayQuestionEl=quizQuestions[i]
//         quizEl.appendChild(displayQuestionEl);
//     //     var response = window.prompt(quizQuestions[i].prompt);

//     //     if(response == quizQuestions[i].answer) {
//     //         score++;
//     //         alert("Correct");
//     //     }

//     //     else {
//     //         alert("Wrong");
//     //     }
//     // }
