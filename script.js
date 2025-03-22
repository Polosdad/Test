const categories = {
    "Science": {
        100: { question: "What is the chemical formula for water?", answer: "H2O" },
        200: { question: "What planet is known as the Red Planet?", answer: "Mars" },
        300: { question: "What organelle is known as the powerhouse of the cell?", answer: "Mitochondria" },
        400: { question: "What force keeps us grounded on Earth?", answer: "Gravity" },
        500: { question: "Who developed the theory of relativity?", answer: "Einstein" }
    },
    "History": {
        100: { question: "Who was the first president of the United States?", answer: "George Washington" },
        200: { question: "In what year did World War II end?", answer: "1945" },
        300: { question: "What ship brought the Pilgrims to America in 1620?", answer: "Mayflower" },
        400: { question: "Which event took place in 1773 involving tea?", answer: "Boston Tea Party" },
        500: { question: "Who was the French leader during the Napoleonic Wars?", answer: "Napoleon" }
    },
    "Geography": {
        100: { question: "What is the highest mountain in the world?", answer: "Mount Everest" },
        200: { question: "Which river is the longest in the world?", answer: "Nile River" },
        300: { question: "What is the largest rainforest on Earth?", answer: "Amazon Rainforest" },
        400: { question: "Which desert is the largest hot desert in the world?", answer: "Sahara Desert" },
        500: { question: "Which ocean is the largest on Earth?", answer: "Pacific Ocean" }
    },
    "Math": {
        100: { question: "What is the mathematical constant approximately equal to 3.14159?", answer: "Pi" },
        200: { question: "Which theorem relates the sides of a right triangle?", answer: "Pythagorean theorem" },
        300: { question: "What concept describes a number that continues indefinitely without repeating?", answer: "Infinity" },
        400: { question: "What are numbers greater than 1 that can only be divided by 1 and themselves?", answer: "Prime numbers" },
        500: { question: "Who is known for the equation e^(iπ) + 1 = 0?", answer: "Euler" }
    },
    "Literature": {
        100: { question: "Who wrote 'Romeo and Juliet'?", answer: "Shakespeare" },
        200: { question: "Who wrote 'The Iliad'?", answer: "Homer" },
        300: { question: "Which novel features the character Jay Gatsby?", answer: "The Great Gatsby" },
        400: { question: "Which novel features a whale named Moby Dick?", answer: "Moby Dick" },
        500: { question: "Which epic poem tells the story of Odysseus' journey home?", answer: "The Odyssey" }
    }
};

let teamNames = [];
let numTeams = 2;
let scores = {};
let currentQuestion = null;
let currentPoints = 0;

function updateTeamNames() {
    const numTeamsSelect = document.getElementById("num-teams");
    numTeams = parseInt(numTeamsSelect.value);
    const teamNamesDiv = document.getElementById("team-names");
    teamNamesDiv.innerHTML = '';

    for (let i = 1; i <= numTeams; i++) {
        const label = document.createElement("label");
        label.innerText = `Team ${i} Name: `;
        const input = document.createElement("input");
        input.type = "text";
        input.id = `team${i}-name`;
        input.placeholder = `Team ${i} Name`;
        teamNamesDiv.appendChild(label);
        teamNamesDiv.appendChild(input);
        teamNamesDiv.appendChild(document.createElement("br"));
    }
}

document.getElementById("num-teams").addEventListener("change", updateTeamNames);

function startGame() {
    // Get team names from the input fields
    for (let i = 1; i <= numTeams; i++) {
        const teamName = document.getElementById(`team${i}-name`).value.trim();
        if (teamName) {
            teamNames.push(teamName);
            scores[teamName] = 0;
        } else {
            alert("Please enter a name for all teams.");
            return;
        }
    }

    // Set up the scoreboard dynamically based on team names
    const scoresDiv = document.getElementById("scores");
    scoresDiv.innerHTML = '';
    teamNames.forEach((teamName) => {
        const div = document.createElement("div");
        div.className = "team";
        div.id = teamName;
        div.innerText = `${teamName}: $0`;
        scoresDiv.appendChild(div);
    });

    // Hide the setup section and show the game section
    document.getElementById("team-setup").style.display = "none";
    document.getElementById("game-section").style.display = "block";

    // Populate the team select dropdown for answering
    const teamSelect = document.getElementById("team-select");
    teamSelect.innerHTML = '';
    teamNames.forEach((teamName) => {
        const option = document.createElement("option");
        option.value = teamName;
        option.innerText = teamName;
        teamSelect.appendChild(option);
    });

    // Generate the board
    generateBoard();
}

document.getElementById("start-game-btn").addEventListener("click", startGame);

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
    document.getElementById("question-text").innerText = `Question: ${categories[category][points].question}`;
    document.getElementById("popup").style.display = "block";
}

function showAnswer() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("answer-text").innerText = `Answer: ${categories[currentQuestion][currentPoints].answer}`;
    document.getElementById("answer-popup").style.display = "block";
}

function updateScore(correct) {
    const team = document.getElementById("team-select").value;
    scores[team] += correct ? currentPoints : -currentPoints;
    document.getElementById(team).innerText = `${team}: $${scores[team]}`;
    document.getElementById("answer-popup").style.display = "none";
}
