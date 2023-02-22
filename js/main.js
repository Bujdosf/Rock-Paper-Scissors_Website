let userScore = 0;
let cpuScore = 0;

let cpuChoice;

window.onload = function () {
    let temp = localStorage.getItem("userScore");
    if (temp != null) {
        userScore = temp;
        document.getElementById("userScore").innerHTML = userScore;
    }

    temp = localStorage.getItem("cpuScore");
    if (temp != null) {
        cpuScore = temp;
        document.getElementById("cpuScore").innerHTML = cpuScore;
    }
}

function computerPlay() {
    const choices = ["rock", "paper", "scissors"];
    let choice = choices[Math.floor(Math.random() * choices.length)];
    return choice;
}


function playRound(playerSelection, computerSelection) {
    let result;
    playerSelection = playerSelection.toLowerCase();
    cpuChoice = computerSelection;
    if (playerSelection == computerSelection) {
        result = "Tie!<br />Don't give up!";
    } else if ((playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")) {
        result = "Congratulations!<br />You won!";
        userScore++;
        localStorage.setItem("userScore", userScore);
    } else {
        result = "Better luck next time!<br />You lost!";
        cpuScore++;
        localStorage.setItem("cpuScore", cpuScore);
    }

    const myDiv = document.getElementById('round choices');
    if (myDiv.innerHTML.trim() === '') {
        myDiv.innerHTML = `
        <span> You -> </span>

        <div id="player_chosen">
        <img src="assets/rock_image.png" id="player_choice" class="player_action" />
        </div>
    
        <span> Vs </span>

        <div id="cpu_chosen">
        <img src="assets/rock_image.png" id="cpu_choice" class="player_action" />
        </div>
        <span> &lt- CPU</span>`;
    }

    if (userScore > 0 || cpuScore > 0) {
        document.getElementById('resetButton').innerHTML = '<button onclick = "resetScores()" > Click this if you want to reset the scores!</button > ';
    }



    let messageDisplay = document.getElementById("cpu_choice");
    messageDisplay.src = "assets/" + computerSelection + ".png";

    let resultDisplay = document.getElementById("player_choice");
    resultDisplay.src = "assets/" + playerSelection + ".png";


    document.getElementById("player_chosen").className = "player_" + playerSelection;
    document.getElementById("cpu_chosen").className = "player_" + computerSelection;


    document.getElementById("userScore").innerHTML = userScore;
    document.getElementById("cpuScore").innerHTML = cpuScore;
    document.getElementById("result").innerHTML = result;
    document.getElementById("result").setAttribute("style", "text-align: center; font-size: 3.5rem; font-weight: bold; color: white; margin-inline-end: 3rem;");

}

function opponentChoicePic() {
    let opponentChoice = new Image();
    switch (cpuChoice) {
        case "rock": opponentChoice.src = "assets/rock.png";
            break;
        case "paper": opponentChoice.src = "assets/paper.png";
            break;
        case "scissors": opponentChoice.src = "assets/scissors.png";
            break;
    }

    let messageDisplay = document.getElementById("opponent-choice");
    messageDisplay.innerHTML = "";
    messageDisplay.insertAdjacentText("beforeend", "Opponent chose: ");
    messageDisplay.insertAdjacentElement("beforeend", document.createElement("br"));
    messageDisplay.setAttribute("style", "text-align: center; font-size: 20px; font-weight: bold; color: white; margin-inline-end: 3rem;");

    messageDisplay.innerHTML += `<img src="${opponentChoice.src}" class = "res"/>`;
    // insert opponentChoice image into message-display

}

function resetScores() {
    userScore = 0;
    cpuScore = 0;
    localStorage.clear();
    document.getElementById("userScore").innerHTML = userScore;
    document.getElementById("cpuScore").innerHTML = cpuScore;
    document.getElementById("result").innerHTML = "";
    document.getElementById('round choices').innerHTML = "";
    document.getElementById('resetButton').innerHTML = "";
}