const quizData = [
    {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: ""
    },
    // Adicionar mais questões
];

let currentQuestion = 0;
let score = 0;
let userChoices = [];

function startQuiz() {
    document.getElementById("start-page").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    showQuestion();
}

function showQuestion() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");

    questionContainer.textContent = quizData[currentQuestion].question;

    const options = quizData[currentQuestion].options;
    optionsContainer.innerHTML = "";

    for (let i = 0; i < options.length; i++) {
        const option = document.createElement("li");
        option.className = "option";
        option.textContent = options[i];
        option.onclick = () => checkAnswer(options[i], option);
        optionsContainer.appendChild(option);
    }
}

function checkAnswer(selectedOption, selectedOptionElement) {
    const correctAnswer = quizData[currentQuestion].correctAnswer;

    userChoices.push({
        question: quizData[currentQuestion].question,
        selected: selectedOption,
        correct: selectedOption === correctAnswer
    });

    selectedOptionElement.classList.add("selected");

    if (selectedOption === correctAnswer) {
        selectedOptionElement.classList.add("correct");
        score++;
    } else {
        selectedOptionElement.classList.add("incorrect");
    }   

    setTimeout(() => {
        selectedOptionElement.classList.remove("selected", "correct", "incorrect");
        currentQuestion++;

        if (currentQuestion < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1000);
}


function showResult() {
    const resultContainer = document.getElementById("result");
    resultContainer.textContent = `You scored ${score} out of ${quizData.length}!`;

    // Mostra a div #summary-container
    document.getElementById("summary-container").style.display = "block";

    // Esconde o container do quiz
    document.getElementById("quiz-container").style.display = "none";

    // Mostra o container do summary
    showSummary();

    // Mostra o botão de reiniciar
    document.getElementById("botao-reiniciar").style.display = "block";
}

function showSummary() {
    const summaryContainer = document.getElementById("summary-container");
    const summary = document.getElementById("summary");

    summary.innerHTML = "";

    for (let i = 0; i < userChoices.length; i++) {
        const choice = userChoices[i];
        const choiceElement = document.createElement("div");
      
        // Adiciona a pergunta e as informações da escolha
        choiceElement.textContent = `Questão ${i + 1}: ${choice.question} - Sua escolha: ${choice.selected}, Correta: ${choice.correct ? 'Sim' : 'Não'}`;
      
        // Adiciona uma quebra de linha no final da string
        choiceElement.textContent += '\n';
      
        // Define o estilo white-space para pre-line - Pesquisar melhor sobre como funciona o parâmetro
        choiceElement.style.whiteSpace = 'pre-line';
      
        summary.appendChild(choiceElement);
      }

    summaryContainer.style.display = "block";
}

function restartQuiz() {
    document.getElementById("start-page").style.display = "flex";
    document.getElementById("quiz-container").style.display = "none";
    currentQuestion = 0;
    score = 0;
    userChoices = [];
    document.getElementById("result").textContent = "";
    document.getElementById("summary-container").style.display = "none";
}