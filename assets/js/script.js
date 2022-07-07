// Must create function that can keep track of high scores.
//Script file must have ability to compare scores with peers *LOCALSTORAGE*
//"ON-CLICK" start button that starts the timer
//"ON-TIMER-START" presents question to the user
// "After-Answer" presents user with another question
//"Answer-Incorrect" presents user with subtracted time from clock/timer
//"Answer-Correct" presents user with additional time on the clock/timer
// "All-Answered" IF/Else "Timer-0" game is over
//"Game-Over" user can save initials/username and score *LOCALSTORAGE*

const question = document.querySelector('#question');
const scoreText = document.querySelector('#score');
const progress = document.querySelector('#progress');
const choices = Array.from(document.querySelectorAll('.choice-txt'));
const progressFull = document.querySelector('#progressFull');

//constants above link score, progress-bar, questions, text, and progress to the html file

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = []

// variables above are flexible and can be changed with interaction by the user

let questions = [
    {
        question: 'I am hot when cold & cold when hot, what am I?',
        choice1: 'coffee',
        choice2: 'opposite',
        choice3: 'stressed',
        choice4: 'In need of a hospital visit',
        answer: 2,
    },
    {
        question: 'What is a variable outside of a function called?',
        choice1: 'Party-Goer',
        choice2: 'Local Variable',
        choice3: 'Global Variable',
        choice4: 'The Phone',
        answer: 3,
    },
    {
        question: 'What is 4 + 4?',
        choice1: '8',
        choice2: '51',
        choice3: '12',
        choice4: '27',
        answer: 1,
    },
    {
        question: 'Who won the battle of Verdun?',
        choice1: 'Germany',
        choice2: 'United States',
        choice3: 'Colombians',
        choice4: 'France',
        answer: 4,
    },
    {
        question: 'What is the only mammal that can not jump?',
        choice1: 'Elephants',
        choice2: 'Grandam Sadie',
        choice3: 'Lizards',
        choice4: 'Flying Squirrel',
        answer: 1,
    },
    {
        question: 'What is the hottest temperature ever recorded?',
        choice1: '17 degrees F',
        choice2: '112 degrees F',
        choice3: 'Old Roommates Breath',
        choice4: '134 degrees F',
        answer: 4,
    },
    {
        question: 'Who played Jules Winnfield in Pulp Fiction?',
        choice1: 'Samuel Colt',
        choice2: 'Samuel Johnson',
        choice3: 'Samuel L. Jackson',
        choice4: 'Samuel Watkins',
        answer: 3,
    },
    {
        question: 'When making a PB&J sandwich, what goes on the plate first?',
        choice1: 'jam',
        choice2: 'bread',
        choice3: 'peanut-butter',
        choice4: 'jelly',
        answer: 2,
    },
    {
        question: 'Oldest country in the world?',
        choice1: 'China',
        choice2: 'San Marino',
        choice3: 'India',
        choice4: 'Egypt',
        answer: 2,
    },
    {
        question: 'What is an instrument in which sounds are made, but can not be played?',
        choice1: 'drums',
        choice2: 'clarinet',
        choice3: 'voices',
        choice4: 'trombone',
        answer: 3,
    },
]

// ARRAY ABOVE CONTAINS ALL THE QUESTIONS AND ANSWERS FOR THE GAME

const MAX_QUESTIONS = 10;

const SCORE_POINTS = 100;

//constants above will not change, user score is based on 100 points and 5 questions

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}
// function above grabs questions from the question-array, counts the questions, and keeps score
//function above also asks for new question function that will be set below

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/highscores.html')
    }
    questionCounter++;
    progress.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionValue = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionValue]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionValue, 1);

    acceptingAnswers = true;
}

//function above saves high score to local storage and selects questions as long as conditions are met
// function above also displays percentages and parts "1/4, 2/4, 3/4," for questions as answered
// function above also keeps track of questions and calculates value Question Index
// function above also configures which question to ask
// constant for choices above allows the data-set to be linked and will know what choice is being clicked
// splice element removes objects from array if neccesary *splices from math function created with questionValue

choices.forEach(choice => {
    choice.addEventListener('click', e=> {
        if(!acceptingAnswers) return


        acceptingAnswers = false;
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

//function above creates an event for when the answer is clicked and returns incorrect or correct from css/styline
//function above also increments score for user when answer is correct
//function above also times out when answer is selected. 

incrementScore = num => {
    score +=num;
    scoreText.innerText = score
}

//function above increments score when answered correctly

startGame ()