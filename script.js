const categories = {
    "Criminal Law": {
        100: ["What is the legal term for stealing?", "Larceny"],
        200: ["What is the Miranda warning meant to protect?", "The right to remain silent"],
        300: ["What is the maximum sentence for a misdemeanor?", "One year in jail"],
        400: ["What is double jeopardy?", "Being tried twice for the same crime"],
        500: ["What does 'mens rea' refer to?", "A guilty mind"]
    },
    "Constitutional Law": {
        100: ["What is the First Amendment about?", "Freedom of speech, religion, and press"],
        200: ["Which amendment abolished slavery?", "13th Amendment"],
        300: ["What is judicial review?", "The Supreme Court's power to declare laws unconstitutional"],
        400: ["What does 'due process' ensure?", "Fair legal procedures"],
        500: ["What is the highest law of the land?", "The U.S. Constitution"]
    },
    "Torts": {
        100: ["What is defamation?", "A false statement harming someone's reputation"],
        200: ["What is negligence?", "Failure to exercise reasonable care"],
        300: ["What does 'strict liability' mean?", "Liability without fault"],
        400: ["What is an intentional tort?", "A wrongful act done on purpose"],
        500: ["What is medical malpractice?", "Negligence by a medical professional"]
    },
    "Contracts": {
        100: ["What is a legally binding agreement called?", "A contract"],
        200: ["What is 'breach of contract'?", "Failure to fulfill contractual obligations"],
        300: ["What are the essential elements of a contract?", "Offer, acceptance, consideration"],
        400: ["What is 'consideration' in a contract?", "Something of value exchanged"],
        500: ["What is an 'unenforceable contract'?", "A contract that cannot be legally upheld"]
    },
    "Property Law": {
        100: ["What is real property?", "Land and anything permanently attached to it"],
        200: ["What is eminent domain?", "Government's power to take private property"],
        300: ["What is adverse possession?", "Gaining property rights by occupying land openly"],
        400: ["What is a deed?", "A document transferring property ownership"],
        500: ["What is a zoning law?", "A law regulating land use"]
    }
};

let teams = {};
let currentQuestion = null;
let currentPoints = 0;
let currentButton = null; // Stores the clicked button

document.getElementById("add-team").addEventListener("click", addTeam);
document.getElementById("start-game").addEventListener("click", startGame);

function addTeam() {
    const teamInputs = document.getElementById("team-inputs");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Team Name";
    teamInputs.appendChild(input);
}

function startGame() {
    const teamInputs = document.querySelectorAll("#team-inputs input");
    if (teamInputs.length === 0) return;

    teams = {};
    const teamSelect = document.getElementById("team-select");
    teamSelect.innerHTML = "";
    document.getElementById("scores").innerHTML = "";

    teamInputs.forEach(input => {
        if (input.value.trim() !== "") {
            const name = input.value.trim();
            teams[name] = 0;

            const scoreDiv = document.createElement("div");
            scoreDiv.className = "team";
            scoreDiv.id = `team-${name}`;
            scoreDiv.innerText = `${name}: $0`;
            document.getElementById("scores").appendChild(scoreDiv);

            const option = document.createElement("option");
            option.value = name;
            option.innerText = name;
            teamSelect.appendChild(option);
        }
    });

    document.getElementById("setup").style.display = "none";
    document.getElementById("game").style.display = "block";
    generateBoard();
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
            button.setAttribute("data-category", category);
            button.setAttribute("data-points", points);
            button.onclick = showQuestion;
            board.appendChild(button);
        });
    }
}

function showQuestion(event) {
    currentButton = event.target; // Store the button clicked
    const category = currentButton.getAttribute("data-category");
    const points = parseInt(currentButton.getAttribute("data-points"));

    currentQuestion = category;
    currentPoints = points;

    document.getElementById("question-text").innerText = categories[category][points][0];
    document.getElementById("popup").style.display = "block";
}

function showAnswer() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("answer-text").innerText = categories[currentQuestion][currentPoints][1];
    document.getElementById("answer-popup").style.display = "block";
}

function updateScore(correct) {
    const team = document.getElementById("team-select").value;
    teams[team] += correct ? currentPoints : -currentPoints;
    document.getElementById(`team-${team}`).innerText = `${team}: $${teams[team]}`;

    // Close the answer pop-up after scoring
    document.getElementById("answer-popup").style.display = "none";

    // Disable the button permanently after the question has been answered
    if (currentButton) {
        currentButton.disabled = true;
        currentButton.style.backgroundColor = "#222"; // Change to a "used" style
        currentButton.style.cursor = "not-allowed";
    }
}
