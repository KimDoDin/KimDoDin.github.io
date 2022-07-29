function randomNumber(min, max) {
    let nb = min + (max - min + 1) * Math.random();
    return Math.floor(nb);
}

// new way to make a function. ARROW FUNCTION
// const playGame = (min, max) => {
function playGame(min,max){
    // generate the mystery number. OUTSIDE of loop
    // let winNumber = randomNumber(1, 100);
    let winNumber = randomNumber(min, max);
    let roundNum = 1;
    
    // const  msg = "Please enter a valid number between 1 and 100";
    // const msg = "Please enter a valid number between " + min + " and " + max;
    let msg = `Please enter a valid number between ${min} and ${max}`;
     
    // create a control variable. initialized to true;
    var keepLooping = true;
    while (keepLooping) {
        let playerNumber;
        do {
            playerNumber = parseInt(prompt(msg));
            msg = "Number is invalid. Try again";
        } while (isNaN(playerNumber) || playerNumber < min || playerNumber > max);
    
        if(playerNumber < winNumber){
            alert('More');
            msg = "guess a higher number";
        } else if (playerNumber > winNumber){
            alert('Less');
            msg = "guess a lower number";
        } else{
            alert("You guessed correctly!!!! " + winNumber);
            keepLooping = false;
        }
    }
    
    var continuePlay = confirm("Do you want to play again?");
    if (continuePlay) {
        playGame(min, max);
    }else{
        alert("See you later!");
    }

}
