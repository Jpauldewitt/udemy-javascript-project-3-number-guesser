
// Game Values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max);
guessesLeft = 3;

//UI Elements
const
    gameWrapper = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
gameWrapper.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
}
);

// Listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);
    // Validate input
    // isNan for no value
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }

    // Check if won
    if (guess === winningNum) {
        gameOver(true, `${winningNum} is correct, YOU WIN!`);
    }
    else {

        // Wrong number
        //guessesLeft = guessesLeft -1;
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            //Game over - lost
            gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
            //Disable input
            guessInput.disabled = true;
            //change border color
            guessInput.style.borderColor = 'red';
            // Set message
            setMessage(`Game Over, you have lost. The correct number was ${winningNum}`, 'red');
        }
        else {
            //Game continue - wrong answer
            // Change border color
            guessInput.style.borderColor = 'red';

            // Clear Input - resets to no input after guess
            guessInput.value = '';

            // Tell user its the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
        }
    }
});

// Game Over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable input
    guessInput.disabled = true;

    //Change border color
    guessInput.style.borderColor = color;

    // Set text color
    message.style.color = color;

    // Set message
    setMessage(msg);

    // Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get Winning Number
function getRandomNum() {
    // 10-1 = 9 +1 = 10
    return Math.floor(Math.random() * (max - min) + min);
}

// Set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}