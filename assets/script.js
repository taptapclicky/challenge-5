// calling html document 
var header = document.querySelector(".header")
var opening = document.querySelector(".opening")
var container = document.querySelector(".container")
var divider = document.querySelector(".divider")
var results = document.querySelector(".results")
var scores = [];
var mark = 0;
var index = 0;
var record = [];
const questionsArr = [
{
    question: "commmanly used data types do not include ",
    options: {
        a: "A. strings",
        b: "B. booleans",
        c: "C. numbers",
        d: "D. alerts",
    },
    answer: "d"
},
{
    question: "The condition in an if/else statement is enclosed with what?",
    options: {
        a: "A. quotes",
        b: "B. curly brackets",
        c: "C. parenthesis",
        d: "D. square brackets",
    },
    answer: "c"
},

{
     question: "string values must be enclosed within ____ when being assigned to variables",
    options: {
        a: "A. quotes",
        b: "B. curly brackets",
        c: "C. parenthesis",
        d: "D. square brackets",
    },
    answer: "a"
},

{
    question: "array's in javascript can be used to store what?",
    options: {
        a: "A. numbers",
        b: "B. strings",
        c: "C. all of the above ",
        d: "D. booleans",
    },
    answer: "c"
},

{
    question: "What can you use to check line of code for debugging",
    options: {
        a: "A. quotes",
        b: "B. teminal",
        c: "C. for loops",
        d: "D. console.log",
    },
    answer: "d"
}
];
var header = document.querySelector(".header")
var opening = document.querySelector(".opening")
var container = document.querySelector(".container")
var divider = document.querySelector(".divider")
var results = document.querySelector(".results")
var scores = [];
var mark = 0;
var index = 0;
var record = [];
function start() {
    var removeAll = container;
    while(removeAll.hasChildNodes()) {
        removeAll.removeChild(removeAll.firstChild);
    };

    var viewScore =document.createElement("p");
    viewScore.classList.add("banner", "view-score");
    viewScore.textContent= "View High Score";

    var time = document.createElement("p");
    time.classList.add("banner","time");
    time.textContent = "Time: ";

    var second = document.createElement("span");
    second.setAttribute("id", "second");
    time.appendChild(second)
    
    var openingTitle = document.createElement("h1");
    openingTitle.classList.add("title")
    openingTitle.textContent = "JavaScript Quiz";

    var startBtn = document.createElement("button");
    startBtn.classList.add("btn", "btn-start");
    startBtn.textContent = "Start Quiz";

    header.appendChild(viewScore)
    header.appendChild(time)
    container.appendChild(openingTitle)
    container.appendChild(startBtn)


    document.querySelector(".btn-start").addEventListener("click", timer);
    document.querySelector(".view-score").addEventListener("click", viewHighScore);


}

function createquiz(){
    var removeAll = container;
    while(removeAll.hasChildNodes()) {
        removeAll.removeChild(removeAll.firstChild)
    };
    if (index<questionsArr.length) {
        var quizHere = document.createElement('div')
        quizHere.classList.add('quiz');
        container.appendChild(quizHere);

        var quizTitle = document.createElement('h1');
        quizTitle.classList.add('Title');
        quizTitle.textContent = questionsArr[index].question;
        quizHere.appendChild(quizTitle);

        var options = questionsArr[index].options;
        for (var x in options) {
            var quizOpt = document.createElement('button');
            quizOpt.classList.add("btn", "btn-answer");
            if (x === questionsArr[index].answer) {
                quizOpt.setAttribute('check', 'correct');
            }
            quizOpt.textContent = options[x];
            quizHere.appendChild(quizOpt);
        }
        index++;

        divider.style.visibility = "visible";

        document.querySelector('.quiz').addEventListener('click', checkResult);
    }
    else {
        var done= document.createElement('h2');
        done.classList.add('title')
        done.textContent=('Quiz Complete!')
        container.appendChild(done);

        var sum = document.createElement('p')
        sum.classList.add('text')
        sum.textContent = "Your final score is" + mark;
        container.appendChild(sum);

        var formEl = document.createElement('p');
        formEl.classList.add("form");
        container.appendChild(formEl);

        var label = document.createElement("label");
        label.classList.add("text");
        label.setAttribute("for", "name");
        label.textContent = "Enter initials:";
        formEl.appendChild(label);


    }
}



function timer() {

    var timeLeft = 70;

    var timeInterval = setInterval(function() {

        var timeEl = document.querySelector("#second");
        timeEl.textContent = timeLeft + "s";
        timeLeft--;

        if (results.textContent.match(/wrong/gi)) {
            timeLeft -= 10; 
        }

        if (timeLeft < 0 || scores.length === questionsArr.length) {

            clearInterval(timeInterval);

            alert("Quiz is over");
            timeEl.textContent = 0 + "s";

            index += questionsArr.length;

           createquiz();
        }
    }, 1000);

    createquiz();
}


function checkResult(event) {

    var targetEl = event.target;

    var check = document.createElement("p");
    check.classList.add("check-result");
    if (targetEl.hasAttribute("check")) {
        check.textContent = "Correct!";
        mark += 10;
    } else {
        check.textContent = "Wrong!";
        mark -= 10;
    }
    results.appendChild(check);
    scores.push(mark);

    setTimeout(() => {
        check.remove();
        createquiz()
    }, 1000);   
}

function recordHighScore(event) {

    event.preventDefault();

    // clear scores array & index
    scores.length = 0;
    index = 0;

    var playerName = document.querySelector("#name").value;

    if (!playerName) {
        alert("please enter a name.");
    } else {
        var recordObj = {
            name: playerName,
            highScore: mark,
        }
    }

    record.push(recordObj);
    saveData();
    // reset mark
    mark = 0;
    viewHighScore();
}

function viewHighScore() {
    // clear page content
    header.style.border = "none";
    var removeHeader = header;
    while (removeHeader.hasChildNodes()) {
        removeHeader.removeChild(removeHeader.firstChild);
    }
    var removeContainer = container;
    while (removeContainer.hasChildNodes()) {
        removeContainer.removeChild(removeContainer.firstChild);
    }

    // create high scores board
    var highScoresTitle = document.createElement("h1");
    highScoresTitle.classList.add("title");
    highScoresTitle.textContent = "High Scores";
    container.appendChild(highScoresTitle);

    loadData();

    // create two buttons
    var goBack = document.createElement("button");
    goBack.classList.add("btn", "btn-goBack");
    goBack.textContent = "Go Back";
    container.appendChild(goBack);

    var clear = document.createElement("button");
    clear.classList.add("btn", "btn-clear");
    clear.textContent = "Clear High Scores";
    container.appendChild(clear);

    document.querySelector(".btn-goBack").addEventListener("click", start);
    document.querySelector(".btn-clear").addEventListener("click", clearHistory);
}

function saveData() {
    localStorage.setItem("high scores", JSON.stringify(record));
}

function loadData() {

    var load = localStorage.getItem("high scores");

    if (!load) {
        return false;
    }

    load = JSON.parse(load);

    for (var i = 0; i < load.length; i++) {
        var highScorestext = document.createElement("li");      
        highScorestext.classList.add("list", "text");
        highScorestext.setAttribute("id", "quiz-mark");
        highScorestext.textContent = load[i].name + " : " + load[i].highScore;
        container.appendChild(highScorestext);
    }
}

function clearHistory() {
    // clear localstorage
    window.localStorage.clear();
    // clear history list under container
    document.querySelectorAll("#quiz-mark").forEach(removeHistory => removeHistory.remove());
}

start();

