let num1, num2 = 6, score = 0;
let maxScore = 10; // score needed to progress to the next stage
let maxNum = 10; // final stage
let motivationalMessages = [
    "Great start! Keep going!",
    "You're doing awesome! Next level!",
    "Fantastic! Next level, you got this!",
    "Excellent! On to the final level!",
    "Congratulations! You've mastered the times tables!"
];

function newQuestion() {
    num1 = Math.floor(Math.random() * 10) + 1;
    document.getElementById('question').textContent = `What's ${num1} * ${num2}?`;
}

async function getRandomPokemon() {
    let pokemonId = Math.floor(Math.random() * 151) + 1; // 151 for the first generation pokemon
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    let data = await response.json();
    let pokemonImg = document.getElementById('pokemon');
    pokemonImg.src = data.sprites.front_default;
    pokemonImg.alt = data.name;
    pokemonImg.style.display = 'block';
}

newQuestion(); // Start the game with a question

document.getElementById('check').addEventListener('click', async function() {
    let answer = document.getElementById('answer').value;
    if (answer == num1 * num2) {
        document.getElementById('result').textContent = 'Correct! Good job! 😊';
        document.getElementById('applause').play();
        score++;
        if (score === maxScore && num2 < maxNum) { // Move to the next stage
            score = 0;
            num2++;
            document.getElementById('stage').textContent = motivationalMessages[num2 - 6];
            await getRandomPokemon();
        } else if (score === maxScore && num2 === maxNum) { // The user has completed the game
            document.getElementById('stage').textContent = motivationalMessages[motivationalMessages.length - 1];
            await getRandomPokemon();
        }
    } else {
        document.getElementById('result').textContent = 'Oops! That’s not correct. Try again. 😔';
        document.getElementById('negative').play();
    }
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('answer').value = '';
    newQuestion();
});

