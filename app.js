// Jeopardy questions with five categories
const questions = {
    "Science": {
        100: ["What is the chemical symbol for water?", "H2O"],
        200: ["What planet is known as the Red Planet?", "Mars"],
        300: ["What is the powerhouse of the cell?", "Mitochondria"]
    },
    "History": {
        100: ["Who was the first president of the United States?", "George Washington"],
        200: ["In what year did World War II end?", "1945"],
        300: ["What was the name of the ship that carried the Pilgrims to America?", "Mayflower"]
    },
    "Geography": {
        100: ["What is the capital of France?", "Paris"],
        200: ["Which continent is the Sahara Desert located in?", "Africa"],
        300: ["What is the largest ocean on Earth?", "Pacific Ocean"]
    },
    "Math": {
        100: ["What is 7 + 8?", "15"],
        200: ["What is the square root of 64?", "8"],
        300: ["What is 12 x 12?", "144"]
    },
    "Movies": {
        100: ["Who directed the movie 'Titanic'?", "James Cameron"],
        200: ["What is the highest-grossing movie of all time?", "Avatar"],
        300: ["Who played Jack in 'Titanic'?", "Leonardo DiCaprio"]
    }
};

// Track scores for three teams
const teamScores = { 1: 0, 2: 0, 3: 0 };
let selectedCategory, selectedPoints;

// Generate the game board dynamically
const board = document.getElementById('board');
Object.keys(questions).forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('bg-blue-700', 'p-4', 'rounded-lg');
    const categoryTitle = document.createElement('h2');
    categoryTitle.classList.add('text-xl', 'font-bold', 'mb-2');
    categoryTitle.textContent = category;
    categoryDiv.appendChild(categoryTitle);

    Object.keys(questions[category]).forEach(points => {
        const button = document.createElement('button');
        button.classList.add('bg-yellow-500', 'p-2', 'rounded', 'text-black', 'font-bold', 'w-full', 'mb-2');
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

// Show the answer modal
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
        teamScores[selectedTeam] += parseInt(selectedPoints);
    }

    updateScores();
    closeAnswerModal();
}

// Close question modal
function closeModal() {
    document.getElementById('question-modal').classList.add('hidden');
}

// Close answer modal
function closeAnswerModal() {
    document.getElementById('answer-modal').classList.add('hidden');
}

// Update the score display
function updateScores() {
    document.getElementById('team-1-score').textContent = teamScores[1];
    document.getElementById('team-2-score').textContent = teamScores[2];
    document.getElementById('team-3-score').textContent = teamScores[3];
}

// Ensure the buttons are dynamically assigned
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("team-select").value = "1"; // Default team selection
});
