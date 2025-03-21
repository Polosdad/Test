// Sample questions object
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
    // Add more categories and questions as needed
};

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
        button.onclick = () => showQuestion(category, points); // Show question when clicked
        categoryDiv.appendChild(button);
    });

    board.appendChild(categoryDiv); // Add the category to the board
});

// Show question in modal
function showQuestion(category, points) {
    const question = questions[category][points];
    document.getElementById('question-title').textContent = `${category} - $${points}`;
    document.getElementById('question-text').textContent = question[0];

    // Show question modal
    document.getElementById('question-modal').classList.remove('hidden');
}

// Show the answer in the modal
function showAnswer() {
    const category = document.getElementById('question-title').textContent.split(' - ')[0];
    const points = document.getElementById('question-title').textContent.split(' - $')[1];
    const answer = questions[category][points][1];

    document.getElementById('answer-text').textContent = `Answer: ${answer}`;

    // Show answer modal
    document.getElementById('answer-modal').classList.remove('hidden');
    document.getElementById('question-modal').classList.add('hidden');
}

// Close question modal
function closeModal() {
    document.getElementById('question-modal').classList.add('hidden');
}

// Close answer modal
function closeAnswerModal() {
    document.getElementById('answer-modal').classList.add('hidden');
}
