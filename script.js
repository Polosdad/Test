const categories = {
    "Science": { 100: "H2O", 200: "Mars", 300: "Mitochondria", 400: "Gravity", 500: "Einstein" },
    "History": { 100: "George Washington", 200: "1945", 300: "Mayflower", 400: "Boston Tea Party", 500: "Napoleon" },
    "Geography": { 100: "Mount Everest", 200: "Nile River", 300: "Amazon Rainforest", 400: "Sahara Desert", 500: "Pacific Ocean" },
    "Math": { 100: "Pi", 200: "Pythagorean theorem", 300: "Infinity", 400: "Prime numbers", 500: "Euler" },
    "Literature": { 100: "Shakespeare", 200: "Homer", 300: "Gatsby", 400: "Moby Dick", 500: "Odyssey" }
};

const scores = { team1: 0, team2: 0 };
let currentQuestion = null;
let currentPoints = 0;

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
    // Use the category and points to fetch the actual question from the categories object
    document.getElementById("question-text").innerText = `Question: What is ${categories[category][points]}?`;
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
    document.getElementById(team).innerText = `${team.replace("team", "Team ")}: $${scores[team]}`;
    document.getElementById("answer-popup").style.display = "none";
}

generateBoard();
