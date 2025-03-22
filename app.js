// Jeopardy questions with five categories
const questions = {
    "Science": {
        100: ["What is the chemical symbol for water?", "H2O"],
        200: ["What planet is known as the Red Planet?", "Mars"],
        300: ["What is the powerhouse of the cell?", "Mitochondria"],
        400: ["What gas do plants absorb?", "Carbon Dioxide"],
        500: ["What is the speed of light?", "299,792,458 m/s"]
    },
    "History": {
        100: ["Who was the first U.S. president?", "George Washington"],
        200: ["In what year did WWII end?", "1945"],
        300: ["What was the Pilgrims' ship called?", "Mayflower"],
        400: ["Who wrote the Declaration of Independence?", "Thomas Jefferson"],
        500: ["When did the Roman Empire fall?", "476 AD"]
    },
    "Geography": {
        100: ["What is the capital of France?", "Paris"],
        200: ["Which continent has the Sahara Desert?", "Africa"],
        300: ["Largest ocean?", "Pacific Ocean"],
        400: ["U.S. state with longest coastline?", "Alaska"],
        500: ["Smallest country?", "Vatican City"]
    },
    "Math": {
        100: ["7 + 8?", "15"],
        200: ["Square root of 64?", "8"],
        300: ["12 x 12?", "144"],
        400: ["Pi to 3 decimals?", "3.142"],
        500: ["Derivative of x²?", "2x"]
    },
    "Movies": {
        100: ["Who directed 'Titanic'?", "James Cameron"],
        200: ["Highest-grossing movie?", "Avatar"],
        300: ["Who played Jack in 'Titanic'?", "Leonardo DiCaprio"],
        400: ["What movie says 'I see dead people'?", "The Sixth Sense"],
        500: ["Most Oscar wins for an actor?", "Katharine Hepburn"]
    }
};

// Track team scores
const teamScores = { 1: 0, 2: 0, 3: 0 };
let selectedCategory, selectedPoints;

// Generate game board
const board = document.getElementById('board');
Object.keys(questions).forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = category;
    categoryDiv.appendChild(categoryTitle);

    [100, 200, 300, 400, 500].forEach(points => {
        const button = document.createElement('button');
        button.textContent = `$${points}`;
        button.onclick = () => showQuestion(category, points);
        categoryDiv.appendChild(button);
    });

    board.appendChild(categoryDiv);
});

// Show question modal
function showQuestion(category, points) {
    selectedCategory = category;
    selectedPoints = points;
    document.getElementById('question-title').textContent = `${category} - $${points}`;
    document.getElementById('question-text').textContent = questions[category][points][0];

    document.getElementById('question-modal').classList.remove('hidden');
}

// Show answer modal
function showAnswer() {
    const answer = questions[selectedCategory][selectedPoints][1];
    document.getElementById('answer-text').textContent = `Answer: ${answer}`;
    document.getElementById('answer-modal').classList.remove('hidden');
    document.getElementById('question-modal').classList.add('hidden');
}

// Handle correct or incorrect answer
function handleAnswer(isCorrect) {
    const selectedTeam = parseInt(document.getElementById('team-select').value);

    if (isCorrect) {
        teamScores[selectedTeam] += selectedPoints;
    } else {
        teamScores[selectedTeam] -= selectedPoints;
    }

    updateScores();
    document.getElementById('answer-modal').classList.add('hidden');
}

// Update scores
function updateScores() {
    document.getElementById('team-1-score').textContent = teamScores[1];
    document.getElementById('team-2-score').textContent = teamScores[2];
    document.getElementById('team-3-score').textContent = teamScores[3];
}
