var words = [
  "atoms",
  "homer",
  "marge",
  "lisa",
  "bart",
  "maggie",
  "ned",
  "smithers",
  "burns",
  "bumblebee",
  "krusty",
  "barney",
  "moe",
  "carl",
  "lenny",
  "shelbyville",
  "monorail",
  "sideshow",
  "apu",
  "otto",
  "skinner",
  "ralph",
  "grampa",
  "santa",
  "patty",
  "selma",
  "troy",
  "herbert",
  "helen",
  "nelson",
  "krustofsky",
  "rod",
];
var wins = 0;
var losses = 0;
var guessesLeft = 10;

var wrongLetter = [];
var underScores = [];
var userGuesses = [];
var ranWord;
var letters = [];

function startGame() {
  underScores = [];

  ranWord = words[Math.floor(Math.random() * words.length)];

  console.log("Random Word: " + ranWord);

  for (var i = 0; i < ranWord.length; i++) {
    underScores.push("_");
  }

  // Printing Underscores
  document.getElementById("answer-text").innerHTML = underScores.join(" ");

  letters = [ranWord.length];

  //reset
  wrongLetter = [];
  guessesLeft = 10;
  wins = 0;
  losses = 0;

  document.getElementById("guesses-left").textContent = guessesLeft;
  document.getElementById("wins-text").textContent = wins;
  document.getElementById("losses-text").textContent = losses;
  document.getElementById("incorrect-guesses").textContent = wrongLetter;

  playSound("start");
}

document.getElementById("start-button").addEventListener("click", startGame);

// Wins and Loses Calculations
function winLose() {
  var guessedWord = letters.join("");

  if (guessedWord === ranWord) {
    wins++;
    document.getElementById("wins-text").textContent = wins;

    //display message
    displayMessage("Winner!");

    playSound("Winner");

    //soft reset
    softReset();
  } else if (guessesLeft === 0) {
    losses++;
    document.getElementById("losses-text").textContent = losses;

    //display message
    displayMessage("Loser!");

    playSound("Loser");

    //soft reset
    softReset();
  }
}

function playSound(param) {
  let s = document.getElementById("sound");
  if (param === "Winner") {
    s.src = "sounds/good-boy.mp3";
    s.play();
  } else if (param === "Loser") {
    s.src = "sounds/man-wgiy.mp3";
    s.play();
  } else if (param === "start") {
    s.src = "sounds/theme.mp3";
    s.play();
  }
}

function displayMessage(message) {
  // Get the modal
  var modal = document.getElementById("message-modal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  //get the modal message area
  document.getElementById("modal-message").innerHTML = message;

  // display the modal
  modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// User Guesses

document.onkeyup = function (event) {
  userGuesses = event.key;

  //Checking if the letter exist inside of the word
  if (ranWord.indexOf(userGuesses) > -1) {
    for (var i = 0; i < ranWord.length; i++) {
      if (ranWord[i] === userGuesses) {
        letters[i] = userGuesses;
        underScores[i] = userGuesses;
        console.log(underScores);
        document.getElementById("answer-text").innerHTML =
          underScores.join(" ");
        winLose();
      }
    }
  } else {
    if (wrongLetter.indexOf(userGuesses) <= -1) {
      wrongLetter.push(userGuesses);
      guessesLeft--;
    }

    document.getElementById("guesses-left").innerHTML = guessesLeft;
    document.getElementById("incorrect-guesses").textContent = wrongLetter;
    winLose();
  }
};

// Reset function that doesnt reset the score
function softReset() {
  letters = [ranWord.length];
  ranWord = words[Math.floor(Math.random() * words.length)];
  wrongLetter = [];
  guessesLeft = 10;
  document.getElementById("guesses-left").textContent = guessesLeft;
  console.log("Random Word: " + ranWord);
  underScores = [];

  for (var i = 0; i < ranWord.length; i++) {
    underScores.push("_");
  }

  // Printing Underscores
  document.getElementById("incorrect-guesses").textContent = wrongLetter;
  document.getElementById("answer-text").innerHTML = underScores.join(" ");
}

startGame();
