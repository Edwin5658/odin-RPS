const scoreMessage = document.querySelector('.game-rule');
const scoreRule = document.querySelector('.score-rule');
const playerImg = document.getElementById('playerImg');
const computerImg = document.getElementById('computerImg');
const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');
const rockBut = document.getElementById('rockbut');
const paperBut = document.getElementById('paperbut');
const scissorBut = document.getElementById('scibut');
const noti = document.getElementById('noti');
const notiMsg = document.getElementById('noti-msg');
const overlay = document.getElementById('overlay');
const restartBut = document.getElementById('restartBut');

let playerscore = 0;
let computerscore = 0;
let roundWinner = '';

rockBut.addEventListener('click', () => handleClick('ROCK'));
paperBut.addEventListener('click', () => handleClick('PAPER'));
scissorBut.addEventListener('click', () => handleClick('SCISSORS'));
restartBut.addEventListener('click', restartGame);
overlay.addEventListener('click', closeNoti)


function playRound(playerChoice, computerChoice) {
    if ((playerChoice === 'ROCK' && computerChoice === 'SCISSORS') || (playerChoice === 'PAPER' && computerChoice === 'ROCK') 
        || (playerChoice === 'SCISSORS' && computerChoice === 'PAPER')) {
            playerscore++;
            roundWinner = 'player';
    } else if ((playerChoice === 'SCISSORS' && computerChoice === 'ROCK') || (playerChoice === 'ROCK' && computerChoice === 'PAPER') 
        || (playerChoice === 'PAPER' && computerChoice === 'SCISSORS')) {
            computerscore++;
            roundWinner = 'computer';
    } else {
        roundWinner = 'tie';
    }
    updateImg(playerChoice, computerChoice);
    updateWinner(playerChoice, computerChoice);
    updateScore();
}

function updateImg(playerChoice, computerChoice) {
    playerImg.src = `./images/${playerChoice.toLowerCase()}.png`;
    computerImg.src = `./images/${computerChoice.toLowerCase()}.png`;
}

function updateWinner(playerChoice, computerChoice) {
    if (roundWinner === 'player') {
        scoreMessage.textContent = "You Win!";
        scoreRule.textContent = `${playerChoice} beats ${computerChoice}`;
    } else if (roundWinner === 'computer') {
        scoreMessage.textContent = "You Lose!";
        scoreRule.textContent = `${playerChoice} is beaten by ${computerChoice}`;
    } else {
        scoreMessage.textContent = "Ties!"
        scoreRule.textContent = `${playerChoice} ties with ${computerChoice}`;
    }
}

function updateScore() {
    playerScore.textContent = `Player: ${playerscore}`;
    computerScore.textContent = `Computer: ${computerscore}`;
}

function getComputerChoice() {
    const choices = ['ROCK', 'PAPER', 'SCISSORS'];
    return choices[Math.floor(Math.random() * 3)];
}

function handleClick(playerChoice) {
    if (playerscore === 5 || computerscore === 5) {
        endGameNoti();
        return;
    }
    if (playerscore === 5 || computerscore === 5) {
        return;
    }
    const computerChoice = getComputerChoice();
    playRound(playerChoice, computerChoice);
    if (playerscore === 5 || computerscore === 5) {
        endGameNoti();
        setEndMsg();
    }
}

function endGameNoti() {
    noti.classList.add('active');
    overlay.classList.add('active');
}

function setEndMsg() {
    return playerscore > computerscore
    ? (notiMsg.textContent = 'You won!')
    : (notiMsg.textContent = 'You lost...');
}

function closeNoti() {
    noti.classList.remove('active');
    overlay.classList.remove('active');
}

function restartGame() {
    playerscore = 0;
    computerscore = 0;
    scoreMessage.textContent = "Choose your weapon";
    scoreRule.textContent = 'First to score 5 points wins the game.';
    playerScore.textContent = 'Player: 0';
    computerScore.textContent = 'Computer: 0';
    closeNoti();
}