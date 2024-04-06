var nextNumber = document.getElementById("next-number");
var revealButton = document.getElementById("reveal-button");
var display = document.getElementById("display-pattern");
var result = document.getElementById("result");
var nextButton = document.getElementById("next-button");
var difficulty = document.getElementById("difficulty");

var sound = new Audio("submit.wav");
var sound_hint = new Audio("hint.wav");
var answer = document.getElementById("answer");
var tries = 0;
var totalTries = 0;
var win = 0;

var numbers = [];

var randomFunctions = [addSquares, twiceAdded,subtractCube,cubedAdd,fibonacci, exponential_one, exponential_two, exponential_three, exponential_four, log_e];


function addSquares() {

    var randomFirst = Math.floor(Math.random()*9)+1;

    numbers.push(randomFirst);

    for (var i = 0; i < 9; i++) {

        numbers.push(numbers[i]+Math.pow([i+1],2))
    }

    hint.innerHTML="Think of squares.";
    difficulty.className = "easy";
}

function twiceAdded() {
    var randomFirst = Math.floor(Math.random()*9)+1;
    numbers.push(randomFirst);
    for (var i = 0; i < 9; i++) {
        numbers.push((2*numbers[i])+(i+1))
    }
    difficulty.className = "easy";
}

function subtractCube() {
    var randomFirst = Math.floor(Math.random()*3)+1;
    for (i = randomFirst; i < randomFirst+9; i++) {
        numbers.push((Math.pow(i+1,3))-(i+1))
    }
    hint.innerHTML = "Try raising to the 3rd power.";
    difficulty.className = "medium";
}

function cubedAdd() {
    var randomFirst = Math.floor(Math.random()*3)+1;
    for (i = randomFirst; i < randomFirst+9; i++) {
        numbers.push((Math.pow(i+1,3))+((i+2)*(i+3)));
    }
    hint.innerHTML = "Think of cubes.";
    difficulty.className = "medium";
}

function fibonacci() {
    var randomFirst = Math.floor(Math.random()*9)+1;
    numbers.push(randomFirst);
    for (var i = 0; i < 9; i++) {
        if(i===0) {
            numbers.push(randomFirst+0)
        } else {
            numbers.push(numbers[i-1]+numbers[i])
        }
    }
    difficulty.className = "easy";
}

function exponential_one() {
    var x = Math.floor(Math.random()*20)+1;
    let term = (n) => Math.pow((1 + (x/n)), n);
    for (let i=0; i <= 9; i++){
        num = toFixed(term(i), 2);       
        numbers.push(num);
    }
    hint.innerHTML = "Do you know about exponential series? Try that.";
    difficulty.className = "hard";
}

function exponential_two() {
    var n = Math.floor(Math.random()*9)+1;
    let term = (i) => Math.pow(-1, n) * Math.pow(i, n);
    for (let i=0; i < 9; i++) {
        numbers.push(term(i));
    }
    hint.innerHTML = "Look again, think in powers.";
    difficulty.className = "hard";
}

function exponential_three() {
    let randomnum = Math.floor(Math.random() * 10) + 1;
    for (let i=0; i<9; i++){
        let power = i+1;
        let value = Math.pow(randomnum, power) / power;
        let rounded = toFixed(value, 2);
        numbers.push(rounded);
    }
    hint.innerHTML = "A number is raised to the index and divided by the index.";
    difficulty.className = "hard";;
}

function exponential_four() {
    let randomnum = (Math.random() * 9) + 1;
    for (let i=0; i<9; i++){
        let value = Math.exp(-1/Math.pow(randomnum+i, 2));
        let rounded = toFixed(value, 2);
        numbers.push(rounded);
    }
    hint.innerHTML = "An exponential of a number. Can you see your mistake?";
    difficulty.className = "hard";
}

function log_e() {
    let randomnum = (Math.random() * 10) + 1;
    for (let i=0; i<9; i++) {
        let value = Math.log(randomnum+i)    
        numbers.push(toFixed(value, 2));
    }
    hint.innerHTML = "Find out a random number added to index and try some log on the it. "
    difficulty.className = "hard";
}

function toFixed( num, precision ) {        
    return (+(Math.round(+(num + 'e' + precision)) + 'e' + -precision)).toFixed(precision);
}


function callRandomFunction() {
    const randomIndex = Math.floor(Math.random()*randomFunctions.length);
    randomFunctions[randomIndex]();
}
callRandomFunction();


function createSpan(element) {
    var span = document.createElement("span")
    span.innerHTML = element;
    display.appendChild(span);
}


function displayPattern() {
    numbers.slice(0,-1).map(element => createSpan(element));
}

displayPattern();


function guess() {
    tries++;
    totalTries++;
    document.getElementById("total-tries").innerHTML = totalTries;

    if (tries == 3) {
        nextButton.style.display = "inline-block";
    }


    
    if (nextNumber.value == numbers[numbers.length-1]) {
    	sound.play();
        win++;
        document.getElementById("wins").innerHTML = win;
        result.innerHTML = "You guessed correctly!";
        result.style.color="#74d900";
        hint.innerHTML = "";
        setTimeout(function(){ nextPattern(), nextNumber.value=""}, 1000);
    } else {
        if (tries != 3 ) {
        	sound.play();
        }
        if (tries == 3 ) {
        	sound_hint.play();
            hint.style.display = "block";
        }
        if (tries >= 3 ) {
            hint.style.display = "block";
        }
        if (tries >= 5 ) {
            revealButton.style.display = "block";
            answer.innerHTML = (numbers[numbers.length-1]);
        }
        result.innerHTML = "No, try again."
        result.style.color = "#d90074"
    }
    yValues = [win, totalTries];
    
    new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "Game Statistics"
    }
  }
});
}


nextNumber.onkeypress = function(event) {
    if (event.which == 13 || event.keyCode == 13) {
		guess();
		return false;
	}
	return true;
}


function nextPattern() {
    tries = 0;
    result.innerHTML = "";
    answer.innerHTML = "";
    hint.style.display = "none";
    answer.style.display = "none";
    document.getElementById("display-pattern").innerHTML = "";
    numbers = [];
    nextButton.style.display = "none";
    revealButton.style.display = "none";
    
    callRandomFunction();
    displayPattern();
    answer.innerHTML = ("answer: ");
}

// Reveals answer

function reveal(){

answer.innerHTML = (numbers[numbers.length-1]);
answer.style.display = "block";
sound_hint.play();

}

// how to
document.getElementById("hide-instructions").onclick = function(e) {
    e.preventDefault;
    document.getElementById("how-to-container").classList.toggle("hidden")
}

var xValues = ["Wins", "Tries"];
var yValues = [0, 0];
var barColors = [
  "#FF4141",
  "#418CFF"
];

new Chart("myChart", {
  type: "pie",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    title: {
      display: true,
      text: "Game Statistics"
    }
  }
});