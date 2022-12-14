const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');
const reloadBtn = document.getElementById('reloadbtn');
const startTimerBtn = document.getElementById('start-timer');

startTimerBtn.addEventListener('click', function () {
    startTimer();
});

function startTimer() {
    let count = 60;
    let counter = setInterval(timer, 1000);
    function timer() {
        count = count - 1;
        if (count <= 0) {
            clearInterval(counter);
            return;
        }
        document.getElementById("countdown-timer").innerHTML = count + " seconds";
    }
}

// getting the value of the p tag with id "countdown-timer"

// Creating a structure to store the high scores
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

let speed = 5;

let littleSquareCount = 20;
let littleSquareSize = canvas.width / littleSquareCount - 2;

let headX = 10;
let headY = 10;

const snakeBodyPieces = [];
let bodyLength = 2;

let velocityX = 0;
let velocityY = 0;

// random locations for items each time 
function randomItemPosition() {

    X = Math.floor(Math.random() * littleSquareCount);
    Y = Math.floor(Math.random() * littleSquareCount);

    snakeBodyPieces.forEach(function isFoodOnSnake(part) {
        const foodIsOnSnake = part.x == X && part.y == X;
        if (foodIsOnSnake) randomFoodPosition();
    })
    
    return {X, Y};
}

let foodX = randomItemPosition().X;
let foodY = randomItemPosition().Y;

let pearX = randomItemPosition().X;
let pearY = randomItemPosition().Y;

let bombX = randomItemPosition().X;
let bombY = randomItemPosition().Y;

let appleX = randomItemPosition().X;
let appleY = randomItemPosition().Y;


let gameScore = 0;
let gameLevel = 0;

const eatSound = new Audio('eat.wav');
const gameOverSound = new Audio("game-over.wav");
const winSound = new Audio("game-win.wav");

class BodyPiece {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

function snakeGame() {

    changeSnakePosition();

    let gameResult = isGameOver();
    if (gameResult) {
        return;
    }

    clear_game();

    isFoodEaten();

    drawFood();
    draw_snake();
    drawScore();
    drawLevel();
    
    if (gameScore > 2){
        gameLevel = 1;
        speed = 6;
    }
    if (gameScore > 5){
        gameLevel = 2;
        speed = 7;
        drawPear();
    }
    if (gameScore > 10){
        gameLevel = 3;
        speed = 8;
        drawApple();
        drawPear();
    }
    if (gameScore > 15){
        gameLevel = 4;
        speed = 10;
        drawApple();
        drawPear();
    }
    if (gameScore > 20){
        gameLevel = 5;
        speed = 12;
        drawApple();
        drawPear();
    }
    if (gameScore > 25){
        gameLevel = 6;
        speed = 14;
        drawApple();
        drawPear();
    }
    if (gameScore > 30){
        gameLevel = 7;
        speed = 15;
        drawApple();
        drawPear();
    }
    if (gameScore > 35){
        gameLevel = 8;
        speed = 16;
        drawApple();
        drawBomb();
        drawPear();
    }
    if (gameScore > 40){
        gameLevel = 9;
        speed = 17;
        drawApple();
        drawBomb();
        drawPear();
    }
    if (gameScore > 45){
        gameLevel = 10;
        speed = 18;
        drawApple();
        drawBomb();
        drawPear();
    }
    if (gameScore === 50){
        drawWinMessage();
        drawReloadButton();
        return;
    }

    setTimeout(snakeGame, 1000/speed); // refresh every 1s (snake will move once every second)
}

function clear_game() {
    // green background
    ctx.fillStyle = "rgb(0,154,23)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // game border
    ctx.setLineDash([]);
    ctx.strokeStyle = "rgb(0, 0, 0)";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function changeSnakePosition() {
    headX += velocityX;
    headY += velocityY;
}

function draw_snake() {

    ctx.fillStyle = "rgba(0,0,0,0.5";
    for (let i = 0; i < snakeBodyPieces.length; i++) {
        let bodyPiece = snakeBodyPieces[i];
        ctx.fillRect(bodyPiece.x * littleSquareCount, bodyPiece.y * littleSquareCount, littleSquareSize, littleSquareSize);
    }
    snakeBodyPieces.push(new BodyPiece(headX, headY));
    while (snakeBodyPieces.length > bodyLength) {
        snakeBodyPieces.shift();
    }


    ctx.fillStyle = "rgb(142, 192, 154)";
    ctx.fillRect(headX * littleSquareCount, headY * littleSquareCount, littleSquareSize, littleSquareSize);

    ctx.setLineDash([]);
    ctx.strokeStyle = "rgb(0, 0, 0.5)";
    ctx.strokeRect(headX * littleSquareCount, headY * littleSquareCount, littleSquareSize, littleSquareSize);
}

function drawFood() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(foodX * littleSquareCount + 7, foodY * littleSquareCount + 1, 6, 6);
    ctx.fillRect(foodX * littleSquareCount + 1, foodY * littleSquareCount + 7, 6, 6);
    ctx.fillRect(foodX * littleSquareCount + 13, foodY * littleSquareCount + 7, 6, 6);
    ctx.fillRect(foodX * littleSquareCount + 7, foodY * littleSquareCount + 13, 6, 6);
}

function drawPear() {
    ctx.fillStyle = "rgba(255, 165, 0, 1)";
    ctx.fillRect(pearX * littleSquareCount + 13, pearY * littleSquareCount + 1, 6, 6);
    ctx.fillRect(pearX * littleSquareCount + 7, pearY * littleSquareCount + 7, 6, 6);
    ctx.fillRect(pearX * littleSquareCount + 13, pearY * littleSquareCount + 7, 6, 6);
    ctx.fillRect(pearX * littleSquareCount + 7, pearY * littleSquareCount + 1, 6, 6);
    ctx.fillStyle="rgb(0,255,0)";
    ctx.fillRect(pearX * littleSquareCount + 10, pearY * littleSquareCount + -1, 5, 4);
}

function drawBomb(){
    ctx.fillStyle = "rgb(0,0, 0)";
    ctx.fillRect(bombX * littleSquareCount + 13, bombY * littleSquareCount + 1, 4, 4);
    ctx.fillRect(bombX * littleSquareCount + 7, bombY * littleSquareCount + 7, 4, 4);
    ctx.fillRect(bombX * littleSquareCount + 13, bombY * littleSquareCount + 7, 4, 4);
    ctx.fillRect(bombX * littleSquareCount + 7, bombY * littleSquareCount + 1, 4, 4);
    ctx.fillRect(bombX * littleSquareCount + 9, bombY * littleSquareCount + 4, 5, 4);
}

function drawApple(){
    ctx.fillStyle = "rgb(255,0, 0)";
    ctx.fillRect(appleX * littleSquareCount + 13, appleY * littleSquareCount + 1, 6, 6);
    ctx.fillRect(appleX * littleSquareCount + 7, appleY * littleSquareCount + 7, 6, 6);
    ctx.fillRect(appleX * littleSquareCount + 13, appleY * littleSquareCount + 7, 6, 6);
    ctx.fillRect(appleX * littleSquareCount + 7, appleY * littleSquareCount + 1, 6, 6);
    ctx.fillStyle="rgb(0,255,0)";
    ctx.fillRect(appleX * littleSquareCount + 10, appleY * littleSquareCount + -1, 5, 4);
}

function isFoodEaten() {
    // if food eaten then the snake grows and score increases
    if (foodX === headX && foodY === headY) {
        foodX = Math.floor(Math.random() * littleSquareCount);
        foodY = Math.floor(Math.random() * littleSquareCount);
        bodyLength++;
        gameScore++;
        eatSound.play();
    }
    //if pair is eaten speed increases
    if (pearX === headX && pearY === headY && gameLevel >= 2) {
        pearX = Math.floor(Math.random() * littleSquareCount);
        pearY = Math.floor(Math.random() * littleSquareCount);
        speed++;
        eatSound.play();
    }
    //if apple is eaten then the speed decreases
    if (appleX === headX && appleY === headY && gameLevel >= 3) {
        appleX = Math.floor(Math.random() * littleSquareCount);
        appleY = Math.floor(Math.random() * littleSquareCount);
        speed = speed-2;
        eatSound.play();
    }
}

function isGameOver() {
    // iniitially the game is not over
    if (velocityX === 0 && velocityY === 0) {
        return false;
    }

    let gameOver = false;

    // check if snake is out of bounds
    if (headX < 0 || headY < 0 || headX === littleSquareCount || headY === littleSquareCount) {
        gameOver = true;
    }

    // check if snake has hit itself
    for (let i = 0; i < snakeBodyPieces.length; i++) {
        let bodyPiece = snakeBodyPieces[i];
        if (bodyPiece.x === headX && bodyPiece.y === headY) {
            gameOver = true;
            break;
        }
    }

    // Checking if the snake has hit the bomb
    if (bombX == headX && bombY == headY && gameLevel >= 8) {
        gameOver = true;
    }

    // if the timer is over then the game is over
    if (gameLevel >= 1) {
        if (parseInt(document.getElementById("countdown-timer").innerHTML) <= 1) {
            gameOver = true;
        }
    }

    if (gameOver) {
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over", canvas.width/5, canvas.height/2);
        gameOverSound.play();

        // Prompt the plauser to enter their name and save the score for the leaderboard
        let playerName = prompt("Game over! Your score was " + gameScore + ". Please enter your name:");
        if (playerName != null) {
            highscore = {
                name: playerName,
                score: gameScore
            }
            highScores.push(highscore);
            highScores.sort(function(a, b) {
                return b.score - a.score;
            });
            localStorage.setItem("highScores", JSON.stringify(highScores));
        } else {
            highscore = {
                name: "Anonymous",
                score: gameScore
            }
            highScores.push(highscore);
            highScores.sort(function(a, b) {
                return b.score - a.score;
            });
            localStorage.setItem("highScores", JSON.stringify(highScores));
        }

        drawReloadButton();
    }
    return gameOver;
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "20px Verdana";
    ctx.fillText("Score: " + gameScore, canvas.width - 110, 20);
}

function drawLevel(){
    ctx.fillStyle = "white";
    ctx.font = "20px Verdana";
    ctx.fillText("Level: " + gameLevel, canvas.width - 380, 20);
}

function drawWinMessage(){
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "50px Verdana";
    ctx.fillText("You Win!", canvas.width/4, canvas.height/2);
    winSound.play();
}

function drawReloadButton(){
    reloadBtn.style.visibility = "visible";
    reloadBtn.style.height = "50px";
    reloadBtn.style.opacity= "1";

    reloadWindow();
}

function reloadWindow() {
    reloadBtn.addEventListener("click", function(){
        window.location.reload();
    })
}

document.body.addEventListener('keydown', event => {
    if (event.keyCode === 38) {
        if (velocityY === 1) return; // prevent snake from going backwards
        velocityX = 0;
        velocityY = -1;
    }
    if (event.keyCode === 40) {
        if (velocityY === -1) return;
        velocityX = 0;
        velocityY = 1;
    }
    if (event.keyCode === 37) {
        if (velocityX === 1) return; 
        velocityX = -1;
        velocityY = 0;
    }
    if (event.keyCode === 39) {
        if (velocityX === -1) return; 
        velocityX = 1;
        velocityY = 0;
    }
});


snakeGame();