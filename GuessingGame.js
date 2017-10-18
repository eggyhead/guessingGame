function Game() { //constructor function, creates a new game
    this.winningNumber = generateWinningNumber();
    this.playersGuess = null;
    this.pastGuesses = [];
}

//The user guesses a number between 1-100. The app should respond and indicate if their
//guess is 'hot' or 'cold' based on how close the guess is to the number they are trying 
//to guess. The game should also keep track of previous guesses, and give the user a way 
//to reset the game, or get a hint.



Game.prototype.playersGuessSubmission = function(num) { //prototype method on "Game", which takes in a num 
    this.playersGuess = num; //sets "playersGuess" to the input num
    if (num < 1 || num > 100 || isNaN(num)) { //checks if the num is less than 1 or more than 100, if so, throws error
        throw "That is an invalid guess."
    } else {
        if (this.checkGuess() === "You Win!") { //uses the output of the checkGuess method to check if the number 
            //matches the "answer" number, 
            return this.checkGuess();
        }
        if(this.checkGuess() !== "You Lose." || "You have already guessed that number.") { //if the output of "checkGuess"
        //from the instance created by this function is not either "You Lose" or "You have already guessed that number"
            if (this.pastGuesses.indexOf(this.playersGuess) !== -1) { //check the index of the players guess in past guesses
                return "You have already guessed that number."
            } else {
                this.pastGuesses.push(this.playersGuess); //push the guess into "pastGuesses"
                return this.checkGuess();
            }   
        }
    }   
    
}

Game.prototype.checkGuess = function() {
    var diff = this.difference(); //call the difference method and set the output to a variable "diff"

    if (this.pastGuesses.length === 5) {
        return "You Lose."
    }

    switch (this.pastGuesses.length < 5) {
        case (diff === 0) :
            return "You Win!";
            break;
        case (diff < 10) :
            return "You\'re burning up!";
            break;
        case (diff < 25):
            return "You\'re lukewarm.";
            break;

        case (diff < 50):
            return "You\'re a bit chilly.";
            break;
        case (diff < 100):
            return "You\'re ice cold!";
            break;
    }   
}

Game.prototype.difference = function() { //outputs the absolute value of the difference beween the player's guess
//and the winning number
    return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function() { //checks if a guess is lower than the winning number
    return this.playersGuess < this.winningNumber ? true : false;
}

Game.prototype.provideHint = function() { //provides a random array of numbers with the winning number inside
    var hints = [];
    for (var i = 0; i < 2; i++) {
        hints.push(generateWinningNumber());
    }
    hints.push(this.winningNumber);
    return shuffle(hints);

}

function generateWinningNumber() { //generate winning number
    var num = (Math.floor(Math.random() * 100)) + 1;

   return num;

}

function newGame() { //creates new game instance
    Game.call(this);
    Object.create(Game.prototype);
    return this;
}

function shuffle(arr) { //shuffles items in an array
    var m = arr.length;

    while (m > 0) {
        var i = Math.floor(Math.random() * m--);

        var t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
    }
    return arr;
}

$(document).ready(function(){
    $('#submit').click(function(e) {
        console.log('clicked');
    });

})