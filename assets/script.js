var startQuizEl = document.querySelector('#start-quiz');

var quizEl = document.querySelector('#quiz');


var startQuiz = function () {
    var counter = 5;

    //start timer when you click the button
    span = document.getElementById("counter");
    span.innerHTML= counter;

    //decrease timer 
    setInterval(function() {
        if (counter >= 0) {
            span.innerHTML= counter;
        }
        if (counter === 0) {
            alert('Sorry, out of time!');
            clearInterval(counter);
        }
        counter--;
    }, 1000);

    //run diplay question function
    displayQuestion();
};

var displayQuestion = function () {
    var quizQuestionEl = document.createElement("p"); 
    quizQuestionEl.innerHTML = "This is the first question!";
    quizEl.appendChild(quizQuestionEl);
};

startQuizEl.addEventListener("click", startQuiz);