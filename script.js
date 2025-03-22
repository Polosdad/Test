const categories = {
  "Science": {
    100: { q: "What is the chemical formula for water?", a: "H2O" },
    200: { q: "What planet is known as the Red Planet?", a: "Mars" },
    300: { q: "What organelle is the powerhouse of the cell?", a: "Mitochondria" },
    400: { q: "What force keeps us on the ground?", a: "Gravity" },
    500: { q: "Who developed the theory of relativity?", a: "Einstein" }
  },
  "History": {
    100: { q: "Who was the first President of the United States?", a: "George Washington" },
    200: { q: "In what year did World War II end?", a: "1945" },
    300: { q: "What ship carried the Pilgrims to America?", a: "The Mayflower" },
    400: { q: "What event involved tea being thrown into a harbor?", a: "Boston Tea Party" },
    500: { q: "Who was the French military leader exiled to Elba?", a: "Napoleon" }
  },
  "Geography": {
    100: { q: "What is the tallest mountain in the world?", a: "Mount Everest" },
    200: { q: "What is the longest river in the world?", a: "Nile River" },
    300: { q: "Which rainforest is the largest on Earth?", a: "Amazon Rainforest" },
    400: { q: "What desert is the largest in the world?", a: "Sahara Desert" },
    500: { q: "Which ocean is the deepest?", a: "Pacific Ocean" }
  },
  "Math": {
    100: { q: "What is 3.14 commonly known as?", a: "Pi" },
    200: { q: "What theorem relates the sides of a right triangle?", a: "Pythagorean theorem" },
    300: { q: "What is the concept of a never-ending number called?", a: "Infinity" },
    400: { q: "What type of numbers are only divisible by 1 and themselves?", a: "Prime numbers" },
    500: { q: "Who introduced the number e?", a: "Euler" }
  },
  "Literature": {
    100: { q: "Who wrote 'Hamlet'?", a: "Shakespeare" },
    200: { q: "Who wrote 'The Odyssey'?", a: "Homer" },
    300: { q: "Who is the main character in 'The Great Gatsby'?", a: "Gatsby" },
    400: { q: "What novel features Captain Ahab hunting a whale?", a: "Moby Dick" },
    500: { q: "Which epic poem tells the story of a Trojan War hero?", a: "The Odyssey" }
  }
};

let scores = {};
let currentQuestion = null;
let currentButton = null;

function setupTeams() {
  const numTeams = parseInt(document.getElementById("num-teams").value);
  document.getElementById("score-board").innerHTML = "";
  document.getElementById("team-select").innerHTML = "";
  scores = {};

  for (let i = 1; i <= numTeams; i++) {
    const teamName = prompt(`Enter name for Team ${i}:`);
    scores[`team${i}`] = 0;

    let scoreDiv = document.createElement("div");
    scoreDiv.className = "team";
    scoreDiv.id = `team${i}`;
    scoreDiv.innerText = `${teamName}: $0`;
    document.getElementById("score-board").appendChild(scoreDiv);

    let option = document.createElement("option");
    option.value = `team${i}`;
    option.innerText = teamName;
    document.getElementById("team-select").appendChild(option);
  }

  document.getElementById("setup-container").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  generateBoard();
}

function generateBoard() {
  const board = document.getElementById("jeopardy-board");
  board.innerHTML = "";

  // Create category headers
  for (let category in categories) {
    let header = document.createElement("div");
    header.className = "category";
    header.innerText = category;
    board.appendChild(header);
  }

  // Create question buttons for each point value in each category
  for (let points of [100, 200, 300, 400, 500]) {
    for (let category in categories) {
      let button = document.createElement("button");
      button.className = "question";
      button.innerText = `$${points}`;
      button.onclick = () => showQuestion(category, points, button);
      board.appendChild(button);
    }
  }
}

function showQuestion(category, points, button) {
  currentQuestion = categories[category][points];
  currentButton = button;
  document.getElementById("question-text").innerText = currentQuestion.q;
  document.getElementById("popup").style.display = "block";
}

function showAnswer() {
  if (!currentQuestion) return;
  document.getElementById("popup").style.display = "none";
  document.getElementById("answer-text").innerText = `Answer: ${currentQuestion.a}`;
  document.getElementById("answer-popup").style.display = "block";
}

function updateScore(correct) {
  const team = document.getElementById("team-select").value;
  // Use the point value from the button text (e.g. "$100")
  const points = parseInt(currentButton.innerText.replace('$', ''));
  scores[team] += correct ? points : -points;
  // Update score display (using the team div's existing text split by ":")
  let teamDiv = document.getElementById(team);
  let teamName = teamDiv.innerText.split(':')[0];
  teamDiv.innerText = `${teamName}: $${scores[team]}`;
  currentButton.disabled = true;
  document.getElementById("answer-popup").style.display = "none";
  currentQuestion = null;
  currentButton = null;
}
