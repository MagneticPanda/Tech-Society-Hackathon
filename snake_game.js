const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');

const reloadBtn = document.getElementById('reloadBtn');

let speed = 5;

const gitTest = 10;

let littleSquareCount = 20;
let littleSquareSize = canvas.width / littleSquareCount - 2;
// NOTE: could change this to an object
let headX = 10;
let headY = 10;

const snakeBodyPieces = [];
let bodyLength = 2;

// NOTE: could change this to an object
let velocityX = 0;
let velocityY = 0;

// NOTE: could change this to an object
// NOTE: could have random initial assignment
let foodX = 2;
let foodY = 2;

//pear values
let pearX=3;
let pearY=3;

//bomb values
let bombX=4;
let bombY=4;

//apple values
let appleX=5;
let appleY=5;


let gameScore = 0;
let gameLevel = 0;



// const eatSound = new Audio('sounds/eat.wav');
// const gameOverSound = new Audio("./sounds/game_over.wav");
// const winSound = new Audio("./sounds/win.wav");



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


    //new methods ->These methods can be used when GameScore
    //              increases
    drawPear();
    drawBomb();
    drawApple();

    // Level transitions
    // TODO: make this more dynamic
    if (gameScore > 2){
        gameLevel = 1;
        speed = 6;
    }
    if (gameScore > 5){
        gameLevel = 2;
        speed = 7;
    }
    if (gameScore > 10){
        gameLevel = 3;
        speed = 8;
    }
    if (gameScore > 15){
        gameLevel = 4;
        speed = 10;
    }
    if (gameScore > 20){
        gameLevel = 5;
        speed = 12;
    }
    if (gameScore > 25){
        gameLevel = 6;
        speed = 14;
    }
    if (gameScore > 30){
        gameLevel = 7;
        speed = 15;
    }
    if (gameScore > 35){
        gameLevel = 8;
        speed = 16;
    }
    if (gameScore > 40){
        gameLevel = 9;
        speed = 17;
    }
    if (gameScore > 45){
        gameLevel = 10;
        speed = 18;
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

function draw_snake() {

    ctx.fillStyle = "rgba(255,255,0,1";
    for (let i = 0; i < snakeBodyPieces.length; i++) {
        let bodyPiece = snakeBodyPieces[i];
        ctx.fillRect(bodyPiece.x * littleSquareCount, bodyPiece.y * littleSquareCount, littleSquareSize, littleSquareSize);
    }
    snakeBodyPieces.push(new BodyPiece(headX, headY));
    while (snakeBodyPieces.length > bodyLength) {
        snakeBodyPieces.shift();
    }


    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fillRect(headX * littleSquareCount, headY * littleSquareCount, littleSquareSize, littleSquareSize);

    ctx.setLineDash([]);
    ctx.strokeStyle = "rgb(0, 0, 0.5)";
    ctx.strokeRect(headX * littleSquareCount, headY * littleSquareCount, littleSquareSize, littleSquareSize);
}

function changeSnakePosition() {
    headX += velocityX;
    headY += velocityY;
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


//bomb outline -- if bomb is touched game is over --
//still need to make method to end game upon eating bomb
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
    if (foodX === headX && foodY === headY) {
        foodX = Math.floor(Math.random() * littleSquareCount);
        foodY = Math.floor(Math.random() * littleSquareCount);
        bodyLength++;
        gameScore++;
        // eatSound.play();
    }
    //if pair is eaten speed increases
    if (pearX === headX && pearY === headY) {
        pearX = Math.floor(Math.random() * littleSquareCount);
        pearY = Math.floor(Math.random() * littleSquareCount);
        speed++;
        // eatSound.play();
    }
    //if apple is eaten then the speed decreases
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * littleSquareCount);
        appleY = Math.floor(Math.random() * littleSquareCount);
        speed = speed-2;
        // eatSound.play();
    }






}

function isGameOver() {

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


    if (gameOver) {
        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.font = "50px Verdana";
        ctx.fillText("Game Over", canvas.width/5, canvas.height/2);
        // gameOverSound.play();

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
    // winSound.play();
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