/*
GAME FUNCTION:
	- Player must guess a number between a min and max
	- Player gets a certain amount of guesses
	- Notify player of guesses remaing
	- Notify the player of the corret answer if loses
	- Let player chosse to play again

*/

// Game values;
let min = 1,
	max = 10,
	winningNum = getRandomNum(min,max),
	guessesLeft = 3;

// UI elements

const game = document.querySelector("#game"),
	  minNum = document.querySelector(".min-num"),
	  maxNum = document.querySelector(".max-num"),
	  guessBtn = document.querySelector("#guess-btn"),
	  guessInput = document.querySelector("#guess-input"),
	  message = document.querySelector(".message");
// Assing UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
	if(e.target.className == 'play-again'){
		window.location.reload();
	}
})

// Listen for guess
guessBtn.addEventListener('click', function(){
	let guess = parseInt(guessInput.value);
	// Validate
	if(isNaN(guess) || guess < min || guess > max){
		setMessage(`Please enter between ${min} and ${max}`, `red`);
	}
	// Check if won
	else if(guess === winningNum){
		// Game over Won
		gameOver(true, `${winningNum} is correct, You Win!`);
	}else{
		// Wrong number
		guessesLeft -= 1;
		if(guessesLeft === 0){
			gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
		}else{
			// Make text 
			guessInput.style.borderColor = 'orange';
			// Display hint 
			if(guess > winningNum){
				setMessage(`${guess} is to LARGE, ${guessesLeft} guesses left.`, 'orange');
			}else{
				setMessage(`${guess} is to small, ${guessesLeft} guesses left.`, 'orange');	
			}
			// Game continues - Answer wrong
			// Clear input 
			
			guessInput.value = '';

			
			
		}
	}
})
// Game over
function gameOver(won, msg){
	let color;
	won === true ? color = 'green' :  color = 'red';

	guessInput.disabled = true;
	// Change border color
	guessInput.style.borderColor = color;
	// Set message
	setMessage(msg, color);
	// Play Again
	guessBtn.value = 'Play Again';
	guessBtn.className += 'play-again'; 
}
function setMessage(msg, color){
	message.style.color = color;
	message.textContent = msg;

}

function getRandomNum(min, max){
	return Math.floor( Math.random()*(max-min+1)+min); 
}