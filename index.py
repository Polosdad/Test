import React, { useState } from "react";

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

export default function JeopardyGame() {
  const [numTeams, setNumTeams] = useState(3);
  const [teams, setTeams] = useState(Array.from({ length: numTeams }, (_, i) => ({ name: `Team ${i + 1}`, score: 0 })));
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleAnswerReveal = (isCorrect) => {
    if (isCorrect) {
      const newTeams = [...teams];
      newTeams.forEach((team) => {
        if (team.name === selectedQuestion.team) {
          team.score += selectedQuestion.points;
        }
      });
      setTeams(newTeams);
    }
    setShowAnswer(true);
  };

  const handleQuestionSelect = (category, points, question, answer) => {
    const team = teams[0]; // Assuming the first team gets the question
    setSelectedQuestion({ category, points, question, answer, team: team.name });
    setShowAnswer(false);
  };

  if (!gameStarted) {
    return (
      <div className="p-4 bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Jeopardy Game Setup</h1>
        <label className="mr-2">Number of Teams:</label>
        <input
          type="number"
          min="1"
          max="5"
          value={numTeams}
          onChange={(e) => {
            const newNumTeams = Math.max(1, Math.min(5, parseInt(e.target.value)));
            setNumTeams(newNumTeams);
            setTeams(Array.from({ length: newNumTeams }, (_, i) => ({ name: `Team ${i + 1}`, score: 0 })));
          }}
          className="px-2 py-1 text-black rounded mb-4"
        />
        {teams.map((team, index) => (
          <input
            key={index}
            type="text"
            value={team.name}
            onChange={(e) => {
              const newTeams = [...teams];
              newTeams[index].name = e.target.value;
              setTeams(newTeams);
            }}
            className="text-lg font-bold text-black px-2 py-1 rounded mb-2"
            placeholder={`Team ${index + 1} Name`}
          />
        ))}
        <button className="px-4 py-2 bg-green-500 text-white rounded mt-4" onClick={handleStartGame}>
          Start Game
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center mb-4">Jeopardy Game</h1>
      <div className="grid grid-cols-5 gap-4 text-center mb-4">
        {teams.map((team, index) => (
          <div key={index} className="flex flex-col items-center">
            <input
              type="text"
              value={team.name}
              onChange={(e) => {
                const newTeams = [...teams];
                newTeams[index].name = e.target.value;
                setTeams(newTeams);
              }}
              className="text-lg font-bold text-black px-2 py-1 rounded mb-2"
            />
            <p className="text-lg font-bold">{team.score}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-4">
        {Object.keys(questions).map((category) => (
          <div key={category} className="bg-blue-700 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">{category}</h2>
            <div className="grid grid-cols-1 gap-2">
              {Object.keys(questions[category]).map((points) => (
                <button
                  key={points}
                  className="bg-yellow-500 p-2 rounded text-black font-bold"
                  onClick={() => handleQuestionSelect(category, parseInt(points), questions[category][points][0], questions[category][points][1])}
                >
                  {points}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedQuestion && !showAnswer && (
        <div className="mt-4 text-center">
          <h3 className="text-xl font-bold">{selectedQuestion.question}</h3>
          <button
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setShowAnswer(true)}
          >
            Show Answer
          </button>
        </div>
      )}

      {showAnswer && selectedQuestion && (
        <div className="mt-4 text-center">
          <p className="text-lg font-bold">Answer: {selectedQuestion.answer}</p>
          <button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => handleAnswerReveal(true)} // Assume correct answer for now
          >
            Correct
          </button>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded ml-4"
            onClick={() => handleAnswerReveal(false)}
          >
            Incorrect
          </button>
        </div>
      )}
    </div>
  );
}
