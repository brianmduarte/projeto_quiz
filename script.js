// Initial data
let currentQuestion = 0;
let correctAnswers = 0;


// Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);
document.addEventListener('DOMContentLoaded', function() {
    const introDiv = document.querySelector('.intro');
    const startQuizBtn = document.getElementById('startQuizBtn');
    const progressBar = document.querySelector('.progress');

    startQuizBtn.addEventListener('click', function() {
        introDiv.style.display = 'none';
        progressBar.classList.remove('hidden');
        showQuestion();
    });
});


// Functions
function showQuestion() {
    if(questions[currentQuestion]) {
        let q = questions[currentQuestion];

        // Criando a barra de porcentagem

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        
        // Exibindo a barra progressiva
        document.querySelector('.progress--bar').style.width = `${pct}%`;

        // Retirando exibição de displays
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

    

        // Exibindo a pergunta
        document.querySelector('.question').innerHTML = q.question;
        

        let optionsHtml = '';
        for(let i in q.options) {
             optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span> ${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });

    } else {
        finishQuiz();
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswers++;
    } 
        
        currentQuestion++;
        showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100);

    if(points < 30 ) {
        document.querySelector('.scoreText1').innerHTML = 'Dá pra melhorar, hein?!';
        document.querySelector('.scorePct').style.color = '#FF0000';
        document.querySelector('.prizeImage').src = 'images/1star-removebg-preview.png';

    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
        document.querySelector('.prizeImage').src = 'images/3star-removebg-preview.png';
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
        document.querySelector('.scorePct').style.color = '#0d630d';
        document.querySelector('.prizeImage').src = 'images/5star-removebg-preview.png';
    };

    
    document.querySelector('.scorePct').innerHTML = `Você acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correctAnswers}`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent() {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}

