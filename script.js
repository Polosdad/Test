const categories = {
    "Science": { 100: "What is H2O?", 200: "What is Mars?", 300: "What is Mitochondria?", 400: "What is Gravity?", 500: "Who is Einstein?" },
    "History": { 100: "Who is George Washington?", 200: "What happened in 1945?", 300: "What is the Mayflower?", 400: "What is the Boston Tea Party?", 500: "Who is Napoleon?" },
    "Geography": { 100: "What is Mount Everest?", 200: "What is the Nile River?", 300: "What is the Amazon Rainforest?", 400: "What is the Sahara Desert?", 500: "What is the Pacific Ocean?" },
    "Math": { 100: "What is Pi?", 200: "What is the Pythagorean theorem?", 300: "What is Infinity?", 400: "What are Prime numbers?", 500: "Who is Euler?" },
    "Literature": { 100: "Who is Shakespeare?", 200: "Who is Homer?", 300: "What is The Great Gatsby?", 400: "What is Moby Dick?", 500: "What is The Odyssey?" }
};

const scores = {};
let currentQuestion = null;
let currentPoints = 0;
let numTeams = 0;
let teamNames = [];

function startGame() {
    numTeams = document.getElementById("num-teams").value;
    teamNames = [];
    for (let i = 1; i <= numTeams; i++) {
        const teamName = document.getElementById(`team${i}-name`).value;
        scores[`team${i}`] = 0;
        teamNames.push(teamName);
        document.getElementById(`team${i}`).innerText = `${teamName}: $0`;
    }
    document.getElementById("setup-popup").style.display = "none";
    generateBoard();
}

function setupTeams() {
    const numTeams = document.getElementById("num-teams").value;
    const teamInputsDiv = document.getElementById("team-inputs");
    teamInputsDiv.innerHTML = ""; // Clear previous inputs
    for (let i = 1; i <= numTeams; i++) {
        const label = document.createElement("label");
        label.innerText = `Team ${i} Name:`;
        const input = document.createElement("input");
        input.type = "text";
        input.id = `team${i}-name`;
        teamInputsDiv.appendChild(label);
        teamInputsDiv.appendChild(input);
        teamInputsDiv.appendChild(document.createElement("br"));
    }
}

function showSetupPopup() {
    document.getElementById("setup-popup").style.display = "block";
}

function generateBoard() {
    const board = document.getElementById("jeopardy-board");
    board.innerHTML = '';

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
    document.getElementById("question-text").innerText = `Question: ${categories[currentQuestion][currentPoints]}`;
    document.getElementById("popup").style.display = "block";
}

function showAnswer() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("answer-text").innerText = `Answer: ${categories[currentQuestion][currentPoints]}`;
    document.getElementById("answer-popup").style.display = "block";
}

function updateScore(correct) {
    const team = document.getElementById("team-select").value;
    scores[team] += correct ? currentPoints : -currentPoints;
    document.getElementById(team).innerText = `${teamNames[parseInt(team.replace('team', '')) - 1]}: $${scores[team]}`;

    // Disable the question button after it has been answered
    const buttons = document.querySelectorAll('.question');
    buttons.forEach(button => {
        if (button.innerText === `$${currentPoints}`) {
            button.disabled = true;  // Disable the button for that question
        }
    });

    // Hide the answer popup
    document.getElementById("answer-popup").style.display = "none";
}
