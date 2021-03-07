const cardBoard = document.querySelector("#cardboard");

const images = [
    'bee.jpg',
    'dog.jpg',
    'elephant.jpg',
    'frog.jpg',
    'horse.jpg',
    'monkey.jpg'
];

let cardHTML = "";

images.forEach(img => {
    cardHTML +=  `
     <div class="memory-card" data-card="${img}">
        <img class="front-face" src="img/${img}">
        <img class="back-face" src="img/alphabet.jpg">
        </div>
    `;
});

cardBoard.innerHTML = cardHTML + cardHTML;

/** Fim renderização HTML */

const cards = document.querySelectorAll('.memory-card');
let firstCard, secondCard;
let lockCard = false;

function flipCard(){
    if(lockCard) return false;  
    this.classList.add('flip');
    if (!firstCard){
        firstCard = this;

        return false;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch(){
    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    !isMatch ? disableCards() : resetCards(isMatch); 
}

function disableCards(){ /** faz voltar do flip */
    
    lockCard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip')
        
        resetCards();  
    }, 1000);
}

(function shuffle(){
    cards.forEach ( card => {
        let rand = Math.floor(Math.random() * 12);
        card.style.order = rand;
    })
}) ()

function resetCards(isMatch = false){
    if(isMatch){
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    }
    [firstCard, secondCard, lockCard] = [null, null, false];
}

cards.forEach(card => card.addEventListener("click", flipCard));
