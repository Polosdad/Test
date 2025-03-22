const categories = {
    "Science": { 100: "What is H2O?", 200: "What is Mars?", 300: "What is Mitochondria?", 400: "What is Gravity?", 500: "Who is Einstein?" },
    "History": { 100: "Who was George Washington?", 200: "What happened in 1945?", 300: "What is the Mayflower?", 400: "What was the Boston Tea Party?", 500: "Who was Napoleon?" },
    "Geography": { 100: "What is Mount Everest?", 200: "What is the Nile River?", 300: "What is the Amazon Rainforest?", 400: "What is the Sahara Desert?", 500: "What is the Pacific Ocean?" },
    "Math": { 100: "What is Pi?", 200: "What is the Pythagorean theorem?", 300: "What is Infinity?", 400: "What are Prime numbers?", 500: "Who was Euler?" },
    "Literature": { 100: "Who was Shakespeare?", 200: "Who was Homer?", 300: "What is The Great Gatsby?", 400: "What is Moby Dick?", 500: "What is The Odyssey?" }
};

let scores = {};
let currentQuestion = null;
let currentPoints = 0;

function setupTeams() {
    const numTeams = parseInt(document.getElementById("num-teams").value);
    const teamInputsDiv = document.getElementById("team-inputs");
    teamInputsDiv.innerHTML = "";

    scores = {};

    for (let i = 1; i <= numTeams; i++) {
        const teamName = prompt(`Enter name for Team ${i}:`);
        scores[`team${i}`] = 0;

        const scoreBoard = document.getElementById("score-board");
        let scoreDiv = document.createElement("div");
        scoreDiv.className = "team";
        scoreDiv.id = `team${i}`;
        scoreDiv.innerText = `${teamName}: $0`;
        scoreBoard.appendChild(scoreDiv);

        const teamSelect = document.getElementById("team-select");
        let option = document.createElement("option");
        option.value = `team${i}`;
        option.innerText = teamName;
        teamSelect.appendChild(option);
    }

    document.getElementById("setup-container").style.display = "none";
    document.getElementById("game-container").style.display = "block";
    generateBoard();
}

function generateBoard() {
    const board = document.getElementById("jeopardy-board");
    board.innerHTML = "";

    Object.keys(categories).forEach(category => {
        let header = document.createElement("div");
        header.className = "category";
        header.innerText = category;
        board.appendChild(header);
    });

    for (let points of [100, 200, 300, 400, 500]) {
        Object.keys(categories).forEach(category => {
            let button = document.createElement("button");
            button.className = "question";
            button.innerText = `$${points}`;
            button.onclick = () => showQuestion(category, points);
            board.appendChild(button);
        });
    }
}

function showQuestion(category, points) {
    currentQuestion = category;
    currentPoints = points;
    document.getElementById("question-text").innerText = categories[currentQuestion][currentPoints];
    document.getElementById("popup").style.display = "block";
}

function showAnswer() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("answer-text").innerText = categories[currentQuestion][currentPoints];
    document.getElementById("answer-popup").style.display = "block";
}

function updateScore(correct) {
    const team = document.getElementById("team-select").value;
    scores[team] += correct ? currentPoints : -currentPoints;
    document.getElementById(team).innerText = `${team}: $${scores[team]}`;
    document.getElementById("answer-popup").style.display = "none";

    document.querySelectorAll('.question').forEach(btn => {
        if (btn.innerText === `$${currentPoints}`) {
            btn.disabled = true;
        }
    });
}
