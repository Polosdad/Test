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
    // Display the actual question from the categories object
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
    document.getElementById(team).innerText = `${team.replace("team", "Team ")}: $${scores[team]}`;
    document.getElementById("answer-popup").style.display = "none";
}

generateBoard();
