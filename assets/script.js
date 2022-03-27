var startQuizEl = document.querySelector('#start-quiz');
var counter = 60;

var startQuiz = function () {
    //start timer when you click the button
    setInterval(function() {
        counter--;
        if (counter >= 0) {
            span = document.getElementById("counter");
            span.innerHTML= counter;   
        }
        if (counter === 0) {
            alert('Sorry, out of time!');
            clearInterval(counter);
        }
    }, 1000);
}

var displayQuestion = function () {
    
}

startQuizEl.addEventListener("click", startQuiz);