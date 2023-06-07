let num1, num2, score = 0;

function newQuestion() {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;
    document.getElementById('question').textContent = `What's ${num1} * ${num2}?`;
}

document.getElementById('check').addEventListener('click', function() {
    let answer = document.getElementById('answer').value;
    if (answer == num1 * num2) {
        document.getElementById('result').textContent = 'Correct! Good job! 😊';
        document.getElementById('result').classList.add('blinking');
        document.getElementById('applause').play();
        score++;
    } else {
        document.getElementById('result').textContent = 'Oops! That’s not correct. Try again. 😔';
        document.getElementById('result').classList.remove('blinking');
        document.getElementById('negative').play();
    }
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('answer').value = '';
    newQuestion();
});

newQuestion();

