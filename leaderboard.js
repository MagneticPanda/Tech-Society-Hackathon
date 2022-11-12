const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

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