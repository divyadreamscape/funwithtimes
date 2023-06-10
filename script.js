let num1, num2, score = 0;

function showTimesTables() {
    let timesTables = document.getElementById('timesTables');
    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            let p = document.createElement('p');
            p.textContent = `${i} * ${j} = ${i * j}`;
            timesTables.appendChild(p);
        }
        let hr = document.createElement('hr');
        timesTables.appendChild(hr);
    }
    document.getElementById('startQuiz').style.display = 'block';
}

function newQuestion() {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
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

document.getElementById('startQuiz').addEventListener('click', function() {
    document.getElementById('timesTables').style.display = 'none';
    document.getElementById('startQuiz').style.display = 'none';
    document.getElementById('question').style.display = 'block';
    document.getElementById('answer').style.display = 'block';
    document.getElementById('check').style.display = 'block';
    newQuestion();
});

document.getElementById('check').addEventListener('click', async function() {
    let answer = document.getElementById('answer').value;
    if (answer == num1 * num2) {
        document.getElementById('result').textContent = 'Correct! Good job! 😊';
        document.getElementById('result').classList.add('blinking');
        document.getElementById('applause').play();
        score++;
        await getRandomPokemon();
    } else {
        document.getElementById('result').textContent = 'Oops! That’s not correct. Try again. 😔';
        document.getElementById('result').classList.remove('blinking');
        document.getElementById('negative').play();
    }
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('answer').value = '';
    newQuestion();
});

showTimesTables();

