// Constante registrada para as perguntas do Quiz
const quizData = [
    {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: ""
    },
    //Perguntas adicionais
];

//Zera as escolhas e o placar ao iniciar
let currentQuestion = 0;
let score = 0;
let userChoices = [];

//Inicialização e apresentação do Quiz
function startQuiz() {

    document.getElementById("start-page").style.display="none";
    document.getElementById("quiz-container").style.display="block";
    document.getElementById("quiz-container").querySelector("h1").style.display = "block";
    showQuestion();
}

//Apresentação das opções de resposta
function showQuestion() {

    const questionContainer = document.getElementById("question-container").style.display = "";
    const optionsContainer = document.getElementById("options-container").style.display = "block";

    questionContainer.textContent = quizData[currentQuestion].question;

    const options = quizData[currentQuestion].options;
    optionsContainer.innerHTML = "";

    for (let i = 0; i < options.length; i++) {
        
        const option = document.createElement("li");
        option.className = "option";
        option.textContent = options[i];
        option.onclick = () => checkAnswer(options[i], option);
    }
}

//Validação da resposta => correta ou incorreta
function checkAnswer(selectedOption, selectedOptionElement) {
    
    const correctAnswer = quizData[currentQuestion].correctAnswer;

    userChoices.push({
        question: quizData[currentQuestion].question,
        selected: selectedOption,
        correct: selectedOption == correctAnswer
    });

    selectedOptionElement.classList.add("selected");

    if (selectedOption === correctAnswer) {
        selectedOptionElement.classList.add("corrrect");
        score++;
    }   else {
        selectedOptionElement.classList.add("incorrect");
    }

    setTimeout(() => {

        selectedOptionElement.classList.remove("selected", "corrrect", "incorrect");
        currentQuestion++;

        if (currentQuestion < quizData.length) {
            showQuestion();
        }  else {
            showResult();
        }
    }, 1000);
}

//Apresentação do resultado
function showResult() {
    
    const resultContainer = document.getElementById("result");
    resultContainer.textContent = `Você acertou ${score} do total de ${quizData.length} perguntas!`;

    //Mostra a div do resultado e esconde a do quiz
    document.getElementById("summary-container").style.display ="block";
    document.getElementById("quiz-container").style.display = "none;"
    showSummary();

    //Mostra o botão para reiniciar
    document.getElementById("restart-button").style.display = "block"

    showSummary();
}

//Reinicia o Quiz
function restartQuiz() {

    //Requisita novamente a div da página inicial e do Quiz
    document.getElementById("start-page").style.display = "flex";
    document.getElementById("quiz-container").style.display = "none";

    //Zera as escolhas e o placar ao iniciar
    currentQuestion = 0;
    score = 0;
    userChoices = [];

    //Zera o resultado e a div do resultado
    document.getElementById("result").textContent = "";
    document.getElementById("summary-container").style.display = "none";
}