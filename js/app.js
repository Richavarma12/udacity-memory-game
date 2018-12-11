let seconds = "";
let minutes = "";
let hours = "";
let timeDiff;
let moves = 0;
let matchList = 0;
let openCards = [];
let isAnimating = true;
let finalStar= document.querySelector('.rating');
let finalTime = document.querySelector('.endTime');
let finalMoves = document.querySelector('.totalMoves');
let count = document.querySelector('.moves');
const starCount = document.querySelectorAll('.fa-star');
let star = document.querySelector('.stars');
let timer = document.querySelector('.gameTimer');
let modalSelector = document.querySelector('.modal');
let replayButton = document.querySelector('.replay');
replayButton.onclick = displayCards;
document.body.onload = displayCards;
let replayGame= document.querySelector('.restart');
replayGame.onclick = displayCards;
let cardList = document.querySelectorAll('.card');
let cardArr = [...cardList];

// Shuffle function given by Udacity
function shuffle(array){
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function displayCards(){
    cardArr = shuffle(cardArr);
    let tempHolder= [];
    for (let i = 0; i < cardArr.length; i++) {
        tempHolder.forEach.call(cardArr, function(item){
    });
    cardArr[i].classList.remove( 'open', 'display', 'match', 'unmatched', 'disabled');
    }
    moves =0;
    matchList =0;
    count.innerHTML = 0;
    for (let i=0; i < starCount.length; i++){
       starCount[i].style.visibility = 'visible';
    }
    clearInterval(timeDiff);
    hours = 0;
    minutes = 0;
    seconds = 0;
    timer.innerHTML = hours + ' hours ' + minutes + ' mins ' + seconds + ' secs ';
    finalStar.innerHTML = '';
    finalMoves.innerHTML = '';
    finalTime.innerHTML = '';
    openCards = [];
    isAnimating = false;
    modalSelector.classList.remove('display');
    gameTime();
 }

let openCard = function(){
    if(isAnimating) return;
    this.classList.toggle('open');
    this.classList.toggle('display');
    this.classList.toggle('disabled');
    openCards.push(this);
    let cardCount = openCards.length;
    if(cardCount === 2){
        movesCounter();
        if(openCards[0].firstElementChild.className === openCards[1].firstElementChild.className){
            matchList++;
            for (let i = 0; i < 2; i++){
                openCards[i].classList.add('match');
                openCards[i].classList.remove('display', 'open');
            }
            openCards = [];
        }else{
            notMatch();
        }
    }
    Gameover();
}

function notMatch(){
    isAnimating = true;
    for(let i = 0; i < 2; i++){
    openCards[i].classList.add('unmatched');
    }
    setTimeout(function(){
        isAnimating = false;
        for(let i = 0; i < openCards.length; i++){
            openCards[i].classList.remove('open', 'display', 'unmatched', 'disabled');
        }
        openCards = [];
    }, 1000);
}
function gameTime(){
    timeDiff = setInterval(function(){
        timer.innerHTML = hours + ' hours ' + minutes + ' mins ' + seconds + ' secs ';
        seconds ++;
        if(seconds == 60){
            minutes++;
            seconds = 0;
        }
        if(minutes == 60){
            hours++;
            minutes = 0;
        }
    }, 1000);
}

function movesCounter(){
    moves++;
    count.innerHTML = moves;
    if(moves < 20 && moves > 15){
        starCount[2].style.visibility = 'collapse';
    }else if(moves > 20){
        starCount[1].style.visibility = 'collapse';
    }
}



//Event Listener
for(let i=0; i <cardArr.length; i++){
    cardArr[i].addEventListener('click', openCard);
}

//function for Gameover modal last page
function Gameover(){
    if (matchList === 8){
        clearInterval(
        );
        finalTime.innerHTML = timer.innerHTML;
        finalMoves.innerHTML = count.innerHTML;
        finalStar.innerHTML = star.innerHTML;
        modalSelector.classList.add('display');
    }
}





