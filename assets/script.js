
var startButton = document.getElementById('start-btn');
var questionContainer = document.getElementById('question-container');
var timerEl = document.getElementById('timer');


// add listener to start button
startButton.addEventListener('click', startQuiz);

function startQuiz() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide');

    startTimer();
}

function nextQuestion() {

}

function selectAnswer() {

}

function startTimer() {
    //start timer when you click the button
    console.log("timer started!")
    var timeLeft = 10;
    console.log(timeLeft);

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
            displayMessage();
        }
    }, 1000);
}

function displayMessage() {
    timerEl.textContent = "Time's up!";
}




// var startQuizEl = document.querySelector('#start-quiz');
// var quizEl = document.querySelector('#quiz');

// var quizQuestions = [
//     {
//      prompt: "This is question 1?\n(a) Answer A\n(b) Answer B\n(c) Answer C",
//      answer: "a"
//     },
//     {
//      prompt: "This is question 2?\n(a) Answer A\n(b) Answer B\n(c) Answer C",
//      answer: "a"
//     },
//     {
//      prompt: "This is question 3?\n(a) Answer A\n(b) Answer B\n(c) Answer C",
//      answer: "a"
//     },
//     {
//      prompt: "This is question 4?\n(a) Answer A\n(b) Answer B\n(c) Answer C",
//      answer: "a"
//     },
// ];

// var score = 0;

// var startQuiz = function () {
//     var counter = 5;

//     //run diplay question function
//     displayQuestion();

//     //start timer when you click the button
//     div = document.getElementById("counter");

//     div.innerHTML=counter;

//     //decrease timer 
//     setInterval(function() {
//         if (counter >= 0) {
//             div.innerHTML= counter;
//         }
//         if (counter === 0) {
//             alert('Sorry, out of time!');
//             clearInterval(counter);
//         }
//         counter--;
//     }, 1000);
// };

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

//     // alert("you got " + score + "/" + quizQuestions.length);
//     }
// };

// startQuizEl.addEventListener("click", startQuiz);