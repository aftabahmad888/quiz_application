
//# Arrey of Questions

const questions = [
    {
      question: "What does HTML stand for?",
      options: ["Hyperlinks and Text Markup Language", "Home Tool Markup Language",
      "Hyper Text Markup Language", "None"],
      correctAnswer: 2 //. it is the index of arrey 
    },
    {
      question: "Who is making the Web standards?",
      options: ["Google", "IBM", "The World Wide Web Consortium", "Microsoft"],
      correctAnswer: 2 //. it is the index of arrey 
    },
    {
      question: "What is the correct HTML element for the largest heading?",
      options: ["h1", "h2", "h6", "big"],
      correctAnswer: 0 //. it is the index of arrey 
    },

    {
      question: "What is the correct HTML element for inserting a line break?",
      options: ["<break>", "<newline>", "<br>", "<new></new>"],
      correctAnswer: 2 //. it is the index of arrey 
    },

    {
      question: "What is the correct HTML for adding a background color?",
      options: ["<body bg='red'>", "<body background='yellow'>", "<div background='green'>", "<div style='background-color:grey;'></div>"],
      correctAnswer: 3 //. it is the index of arrey 
    },

    {
      question: "What is the correct HTML for creating a hyperlink?",
      options: ["<a href='http://www.google.com'>google</a>", "<a url='http://www.google.com'>google</a>", "<a>href='http://www.google.com'</a>", "C++"],
      correctAnswer: 0 //. it is the index of arrey 
    },

    {
      question: "Which programming language is known for building web pages?",
      options: ["Java", "Python", "HTML", "C++"],
      correctAnswer: 2 //. it is the index of arrey 
    },
    
  ];

//# Variables made out of the id

    const startBtn = document.getElementById('start');
    const questionsContainer = document.getElementById('questions');
    const endScreen = document.getElementById('end-screen');
    const feedback = document.getElementById('feedback');
    const timeElement = document.getElementById('time');
    const initialsInput = document.getElementById('initials');
    const submitBtn = document.getElementById('submit');
    const finalScoreElement = document.getElementById('final-score');

//# Setting the index of question, score, and time to zero in start

    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 60;

// # startQuiz function is triggered when the "Start Quiz" button is clicked.
    startBtn.addEventListener('click', startQuiz);

    function startQuiz() {
      startBtn.style.display = 'none';
      questionsContainer.style.display = 'block';
      displayQuestion(); //# displayQuestion(); is called here.
      startTimer(); //# startTimer(); is called here.
    }

//#the displayQuestion function shows the first question on the screen.

    function displayQuestion() {
      const currentQuestion = questions[currentQuestionIndex];
      const questionTitleElement = document.getElementById('question-title');
      const choicesContainer = document.getElementById('choices');

      questionTitleElement.textContent = currentQuestion.question;

      choicesContainer.innerHTML = "";
      currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(index));
        choicesContainer.appendChild(button);
      });
    }
// # Function for checking the answers

    function checkAnswer(selectedIndex) {
      const currentQuestion = questions[currentQuestionIndex];

      if (selectedIndex === currentQuestion.correctAnswer) {
        // *Correct answer
        score++;
      } else {
        // !Incorrect answer, subtract time (e.g., 10 seconds)
        timeLeft -= 10;
        if (timeLeft < 0) {
          timeLeft = 0; // Ensure time doesn't go negative
        }
      }

      currentQuestionIndex++;

      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        endQuiz();
      }
    }
//# startTimer function initiates the countdown timer.
    function startTimer() {
      const timerInterval = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;

        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          endQuiz();
        }
      }, 1000);
    }
//# Function run to end the quiz
    function endQuiz() {
      questionsContainer.style.display = 'none';
      endScreen.style.display = 'block';
      finalScoreElement.textContent = score;
    }
//# Function for submitting the quiz 

    submitBtn.addEventListener('click', () => {
      const initials = initialsInput.value.toUpperCase();
      const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

      highScores.push({ initials, score });
      highScores.sort((a, b) => b.score - a.score);

      localStorage.setItem('highScores', JSON.stringify(highScores));

      alert('Quiz submitted! High scores: ' + JSON.stringify(highScores));
    });