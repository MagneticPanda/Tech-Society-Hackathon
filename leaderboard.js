// creating a leaderboard for the game

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// function getHighScore() {
//     let playerName = document.getElementById('playerName').value;
//     let score = document.getElementById('score').value;
//     const highScore = {
//         name: playerName,
//         score: score
//     }
//     highScores.push(highScore);
//     highScores.sort((a, b) => b.score - a.score);
//     highScores.splice(5);

//     localStorage.setItem("highScores", JSON.stringify(highScores));
//     window.location.assign("highscores.html");
// }

/* creating a table to display all the high scores */
function displayHighScores() {
    let table = document.getElementById('leaderboard-table');
    for (let i = 0; i < highScores.length; i++) {
        let row = `<tr>
                    <td>${highScores[i].name}</td>
                    <td>${highScores[i].score}</td>
                </tr>`;
        table.innerHTML += row;
    }
}

// Adding a new table to the html which should display the highScores

function load_table() {
    let table = document.createElement('table');
    table.setAttribute('id', 'leaderboard-table');
    let row = document.createElement('tr');
    let name = document.createElement('th');
    let score = document.createElement('th');
    name.innerHTML = 'Name';
    score.innerHTML = 'Score';
    row.appendChild(name);
    row.appendChild(score);
    table.appendChild(row);
    document.body.appendChild(table);
}

load_table();

document.addEventListener('DOMContentLoaded', displayHighScores);