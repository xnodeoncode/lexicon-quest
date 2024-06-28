// Lexicon Quest App Interface (MVC).

// Importing Dictionaries
import { Simpsons } from "./dictionaries/simpsons.js";
import { Astronomy } from "./dictionaries/astronomy.js";
import { States } from "./dictionaries/states.js";

// Importing Dictionary Service for fetching words from the dictionary API.
import { DictionaryService } from "./services/dictionaryService.js";

document.getElementById("start-button").addEventListener("click", startGame);

// theme music player
var themeAudioPlayer = document.getElementById("theme-audio-player");

// Add event listener to sound image.
var soundImage = document.getElementById("sound-image");
soundImage.addEventListener("click", controlSound);

// Global Variables
var words = [];
var fallbackWords = [];
var wins = 0;
var losses = 0;
var guessesLeft = 10;

var wrongLetter = [];
var underScores = [];
var userGuesses = [];
var ranWord;
var letters = [];
var dataServiceAvailable = false;

/*************************************************************************************
 * Fallback words to use in case the dictionary service is unavailable.
 *************************************************************************************/
fallbackWords = fallbackWords.concat(Simpsons).concat(Astronomy).concat(States);

/*************************************************************************************
 * startGame() | Void: This function initializes the game and builds the UI.
 *************************************************************************************/
async function startGame() {
  // underscores are the same length as the word.
  underScores = [];

  /* Get a random word from the dictionary.
  if the dictionary service is available, use it to get a word.
  Otherwise, use the fallback words. */
  if (words.length > 0 && dataServiceAvailable) {
    ranWord = words[Math.floor(Math.random() * words.length)];
  } else {
    ranWord = fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
    console.log("using fallback word.");
  }

  console.log("Random Word: " + ranWord);

  // Creating underscores based on the length of the word.
  for (var i = 0; i < ranWord.length; i++) {
    underScores.push("_");
  }

  // Printing underscores to the UI.
  document.getElementById("answer-text").innerHTML = underScores.join(" ");

  // Determine the length of the word and set the letters array to the same length.
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
}

/********************************************************************************
 * controlSound() | Void: This function mutes/unmutes the theme music.
 ********************************************************************************/
function controlSound() {
  if (themeAudioPlayer.muted) {
    unMuteAudio();
    soundImage.src = "./images/sound-unmuted-image.png";
  } else if (!themeAudioPlayer.muted) {
    muteAudio();
    soundImage.src = "./images/sound-muted-image.png";
  }
}

/********************************************************************************
 * playSound() | Void: This function plays a game sound based on the parameter.
 ********************************************************************************/
function playSound(param) {
  let s = document.getElementById("game-audio-player");
  if (param === "Winner") {
    s.src = "sounds/good-boy.mp3";
    s.play();
    themeAudioPlayer.pause();
  } else if (param === "Loser") {
    s.src = "sounds/man-wgiy.mp3";
    s.play();
    themeAudioPlayer.pause();
  }
}

/********************************************************************************
 * muteAudio() | Void: This function mutes the theme music.
 ********************************************************************************/
function muteAudio() {
  themeAudioPlayer.muted = true;
}

/********************************************************************************
 * unMuteAudio() | Void: This function unmutes the theme music.
 ********************************************************************************/
function unMuteAudio() {
  themeAudioPlayer.muted = false;
}

/********************************************************************************
 * pauseAudio() | Void: This function pauses the theme music.
 ********************************************************************************/
function pauseAudio() {
  themeAudioPlayer.pause();
}

/********************************************************************************
 * resumeAudio() | Void: This function resumes the theme music.
 ********************************************************************************/
function resumeAudio() {
  themeAudioPlayer.play();
}

/********************************************************************************
 * winLose() | Void: This function checks if the user successfully guessed the word.
 * And displays a message accordingly.
 ********************************************************************************/
function winLose() {
  var guessedWord = letters.join("");

  if (guessedWord === ranWord) {
    wins++;
    document.getElementById("wins-text").textContent = wins;

    //display message
    displayMessage(
      `Winner! You guessed <a href='https://www.merriam-webster.com/dictionary/${guessedWord}' target='_blank'>${guessedWord}</a> correctly.`
    );

    playSound("Winner");

    //soft reset
    softReset();
  } else if (guessesLeft === 0) {
    losses++;
    document.getElementById("losses-text").textContent = losses;

    //display message
    displayMessage(
      `Loser! The word was: <a href='https://www.merriam-webster.com/dictionary/${ranWord}' target='_blank'>${ranWord}</a>.`
    );

    playSound("Loser");

    //soft reset
    softReset();
  }
}

/********************************************************************************
 * displayMessage() | Void: This function displays a message in a modal.
 ********************************************************************************/
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
    //restart theme music.
    themeAudioPlayer.play();
  };
}

/********************************************************************************
 * event listener for keyup event. This function checks if the user guessed a letter.
 * And updates the game accordingly.
 ********************************************************************************/
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

/********************************************************************************
 * fetchTerm() | Void: This function fetches a term using the dictionary service.
 * And stores the term in the words array.
 * The function is called every 10 seconds.
 ********************************************************************************/
async function fetchTerm() {
  try {
    var dictionaryService = new DictionaryService();
    var w = await dictionaryService.fetchTerm();
    if (w.length > 0) {
      words.push(w);
    }
    console.log(words);
    dataServiceAvailable = true;
  } catch (e) {
    console.log(e);
    dataServiceAvailable = false;
  }

  setTimeout(fetchTerm, 10000);
}

/********************************************************************************
 * softReset() | Void: This function resets the game for another term without changing
 * the numbers of wins and losses.
 ********************************************************************************/
function softReset() {
  if (words.length > 15 && dataServiceAvailable) {
    ranWord = words[Math.floor(Math.random() * words.length)];
  } else {
    ranWord = fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
    console.log("using fallback word.");
  }

  letters = [ranWord.length];
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

// Start the game.
startGame();

// Start fetching terms.
await fetchTerm();
