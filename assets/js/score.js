const username = document.querySelector('#username');
const finalScore = document.querySelectorAll('#finalScore')
const saveScore = document.querySelector('#saveScore');
const mostRecentScore = document.querySelector('#mostRecentScore')

// additional constants are for the username & highscore.html functions that will fit below


const highScores = JSON.parse(localStorage.getItem('highScores')) || []
const localScore = JSON.parse(localStorage.getItem('username')) || [];


// additional constant provides the maximum number of scores that will be shown in that element


const MAX_SCORES = 10;


// constant above returns the current value of the given key (highscores element) or an empty string

finalScore.innerText = mostRecentScore
username.innerText = 

// above sets final score text to mostRecentScore Object
 function usernameInput (event) {
    if (event.key === 'Enter') {
         saveHighScore ();
     }
 }
//  username.addEventListener('keyup', () => {
//     saveScore.disabled = !username.value ;
//  })
//function above adds event listener if its equal to username and it is NOT true it will be set
username.onkeyup = usernameInput;
saveHighScore = e => {
    e.preventDefault()

    let score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })
    highScores.splice(10)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}

//function above prevents page from refreshing when a new score is added