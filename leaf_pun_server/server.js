const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use(cors()); // Enable CORS for all routes

let questions;
let questionIndices = [];

fs.readFile('res/questions.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading questions.json:', err);
        return;
    }

    questions = JSON.parse(data);

    // Create an array of question indices and shuffle it
    questionIndices = Array.from({ length: questions.length }, (_, i) => i);
    shuffleArray(questionIndices);

    let questionIndex = 0;

    app.get('/question', (req, res) => {
        const question = questions[questionIndices[questionIndex]];
        questionIndex = (questionIndex + 1) % questionIndices.length;
        // Once done, reshuffle the questions.
        if (questionIndex === questionIndices.length - 1) {
            shuffleArray(questionIndices);
        }
        res.json(question);
    });

    app.get('/questions_length', (req, res) => {
        res.json({ length: questions.length });
    });
});

fs.readFile('res/instructions.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading instructions.json:', err);
        return;
    }

    instructions = JSON.parse(data);

    app.get('/game_name', (req, res) => {
        res.json({ game_name: instructions.game_name });
    });

    app.get('/game_instructions', (req, res) => {
        res.json({ game_instructions: instructions.game_instructions });
    });
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
