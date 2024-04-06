var nextNumber = document.getElementById("next-number");
var revealButton = document.getElementById("reveal-button");
var display = document.getElementById("display-pattern");
var result = document.getElementById("result");
var nextButton = document.getElementById("next-button");
var difficulty = document.getElementById("difficulty");
var submitButton = document.getElementById("submit-button");
var sound = new Audio("submit.wav");
var sound_hint = new Audio("hint.wav");
var answer = document.getElementById("answer");
var tries = 0;
var totalTries = 1;
var win = 0;
var isProblem = false;

alert("This thing is still in beta. Please read the instructions!");
// Function to fetch and parse a CSV file from a URL into a 2D array
async function fetchAndParseCSV(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch CSV file');
        }
        const csvData = await response.text();
        const csvRows = csvData.trim().split('\n');
        const csvArray = csvRows.map(row => row.split(','));
        return csvArray;
    } catch (error) {
        console.error('Error fetching or parsing CSV:', error);
        return null;
    }
}
var numbers = [];
var problem = [];
submitButton.innerHTML = "Generate Problem";

// Example usage
const csvUrl = 'https://raw.githubusercontent.com/alza244/alza244.github.io/main/problems.csv'; // URL of the CSV file

fetchAndParseCSV(csvUrl)
    .then(data => {
        if (data) {
            console.log('CSV data:', data);
            // Here you can perform any operations with the parsed CSV data
            numbers = data;
            const randomIndex = Math.floor(Math.random()*83);
            problem = data[randomIndex];
            
            console.log('numbers var:', numbers);
            console.log('problem var:', problem);
        } else {
            console.error('No data fetched or parsed.');
        }
    });


function newProblem(){
fetchAndParseCSV(csvUrl)
    .then(data => {
        if (data) {
            console.log('CSV data:', data);
            // Here you can perform any operations with the parsed CSV data
            numbers = data;
            const randomIndex = Math.floor(Math.random()*83);
            problem = data[randomIndex];
            
            console.log('numbers var:', numbers);
            console.log('problem var:', problem);
        } else {
            console.error('No data fetched or parsed.');
        }
    });
}



function createSpan(element) {
    var span = document.createElement("span")
    span.innerHTML = element;
    display.appendChild(span);
}



function guess() {

if (!isProblem) {
        difficulty.innerHTML = (problem[0]);
		hint.innerHTML = (problem[2]);
		isProblem = true;
		submitButton.innerHTML = "Submit";
    }
else{
	tries++;
    document.getElementById("total-tries").innerHTML = totalTries;
	
    if (tries == 3) {
        nextButton.style.display = "inline-block";
    }


    var userInput = nextNumber.value
    //If user answered correctly
    if (problem[1].replace(/\s/g, '') == userInput.replace(/\s/g, '')) {
    	sound.play();
        win++;
        document.getElementById("wins").innerHTML = win;
        result.innerHTML = "Correct!";
        result.style.color="#74d900";
        hint.innerHTML = "";
        setTimeout(function(){ nextPattern(), nextNumber.value=""}, 1000);
    } else {
    //If user answered incorrectly.
    totalTries++;
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
            answer.innerHTML = (problem[1]);
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
      text: "Statistics"
    }
  }
});
}
}

// Checks the users input when the Enter key is pressed
nextNumber.onkeypress = function(event) {
    if (event.which == 13 || event.keyCode == 13) {
		guess();
		return false;
	}
	return true;
}

// Function to call the next pattern
function nextPattern() {
	isProblem = false;
    tries = 0;
    newProblem();
    hint.innerHTML = (problem[2]);
    submitButton.innerHTML = "Generate Problem";
    difficulty.innerHTML = (problem[0]);
    result.innerHTML = "";
    answer.innerHTML = (problem[1]);
    hint.style.display = "none";
    answer.style.display = "none";
    document.getElementById("display-pattern").innerHTML = "";
    nextButton.style.display = "none";
    revealButton.style.display = "none";
    
   // displayPattern();
}



// Reveals the answer

function reveal(){

answer.innerHTML = (problem[1]);
answer.style.display = "block";
sound_hint.play();

}

//Hide How-To Instructions
document.getElementById("hide-instructions").onclick = function(e) {
    e.preventDefault;
    document.getElementById("how-to-container").classList.toggle("hidden")
}


// Pie Chart to show statistics
var xValues = ["Correct", "Incorrect"];
var yValues = [0, 0];
var barColors = [
  "#418CFF",
  "#FF4141"
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
      text: "Statistics"
    }
  }
});