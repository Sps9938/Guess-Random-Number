let randomNumber = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');
let prevGuess = [];
let numGuess = 1;

let playGame = true;
if (playGame) {
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        // console.log(guess);
        validateGuess(guess);
    });
}
function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('PLease enter a valid number');
    } else if (guess < 1) {
        alert('PLease enter a number more than 1');
    } else if (guess > 100) {
        alert('PLease enter a  number less than 100');
    } else {
        prevGuess.push(guess);
        if (numGuess === 10) {
            displayGuess(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endGame();
        }
        else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage(`You guessed it right and Random number was ${randomNumber} `);
        endGame();
    } else if (guess < randomNumber) {
        displayMessage(`Number is Too low`);
    } else if (guess > randomNumber) {
        displayMessage(`Number is TOOO High`);
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.innerHTML += `${guess}, `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
    /*
        p.classList.add('button'); is a JavaScript statement that adds the CSS class 'button' to the <p> element.

What It Means:
p: Refers to the paragraph element (<p>) created using document.createElement('p').
.classList: A property that provides a list of all the classes associated with the HTML element. It also includes
 methods like .add(), .remove(), and .toggle() for manipulating these classes.
.add('button'): This method adds the CSS class 'button' to the element. This class can be defined in a stylesheet,
 and it applies the associated styles to the paragraph element.
    */
    p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function (e) {
        randomNumber = parseInt(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled');
        /*
            userInput.removeAttribute('disabled'); is a JavaScript command that removes the disabled attribute from the
             userInput element, enabling it to be used again.

Breakdown:
userInput: This references the input element (e.g., a text field) that was selected earlier with document.querySelector('#guessField').
.removeAttribute('disabled'): This method removes the disabled attribute from the element. The disabled attribute makes an input field
 unclickable and prevents users from interacting with it (e.g., typing text). When you call removeAttribute('disabled'), the input field 
 becomes active again, allowing the user to interact with it.
In the context of your code, this is used at the end of the game to re-enable the input field so the player can enter guesses again during
 a new game.
        */
        startOver.removeChild(p);
        displayMessage('');
        playGame = true;
    });
}

/*
    How the Game Restarts without a Loop:
Initial Game Setup: When the page loads, the game initializes with playGame = true and assigns an event listener to the 
"submit" button. This is done through:

javascript
Copy code
submit.addEventListener('click', (e) => {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
});
This event listener listens for a "click" on the submit button and prevents the default form submission behavior 
using e.preventDefault().
Once clicked, the current user input is validated and processed by calling the validateGuess() function.
Handling Guesses:

In the validateGuess(guess) function, the input is checked if it's a valid number and within the range (1-100). If
 it is valid, it proceeds to either check if the guess is correct or continue to the next guess.
The numGuess keeps track of the number of guesses made, and the prevGuess array stores the history of guesses.
Once the player either guesses correctly or reaches 10 attempts, the endGame() function is called, disabling further input:
javascript
Copy code
userInput.setAttribute('disabled', '');
Restarting the Game:

In endGame(), the game shows a "Start new Game" button by appending it to the DOM, like so:
javascript
Copy code
p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
startOver.appendChild(p);
The playGame = false flag ensures that no further guesses are processed.
The newGame() function sets up a new event listener for this "Start new Game" button, resetting all the game variables like
 randomNumber, prevGuess, and numGuess. It also re-enables the input field and removes the "Start new Game" button.
This effectively "restarts" the game when the user clicks the "Start new Game" button:
javascript
Copy code
newGameButton.addEventListener('click', function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${11 - numGuess}`;
    userInput.removeAttribute('disabled');
    startOver.removeChild(p);
    playGame = true;
});
How It Runs Again After Clicking "Submit" without a Loop:
The game works by handling state through event listeners. Instead of using a loop to check for new guesses, it waits for
 user interaction (i.e., clicking the submit button).
Each time the submit button is clicked, a new guess is processed, and the game flow continues based on the user's input.
Once the game ends (either by guessing correctly or exhausting attempts), the game enters the "restart" phase where a new
 game can be initiated by the user through clicking the "Start new Game" button.
This structure ensures that the game can be played repeatedly without an explicit loop but rather by responding to user interactions.
*/