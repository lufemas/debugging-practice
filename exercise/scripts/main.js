  var reloadBtn;
  var usernames = [];
  var cards;
  var selectedCards;
  var matchedCards;
  var cardValues = [1,1,2,2,3,3]
  var isWaiting = false;

function loadGame(){
  cards = document.querySelectorAll('.card');
  selectedCards = [];
  matchedCards = [];

  let currentCardValues = cardValues.length-1;
  shuffle(cardValues);

  cards.forEach(function(card) {

    card.classList.remove('is-selected');
    card.classList.remove('is-matched');

   
    console.log (cardValues);
    card.cardValue = cardValues[currentCardValues];
    currentCardValues--;
    // card.innerText = String(card.cardValue);
    console.log(`card: ${card.innerText}`);
    console.log(`cardValue: ${card.cardValue}`);
    console.log(`currentCardValue: ${currentCardValues}`);
      if (usernames[card.cardValue-1].value != ""){ 
        card.children[0].src = "https://github.com/" + usernames[card.cardValue-1].value + ".png"
      }else{
        card.children[0].src = "https://source.unsplash.com/random/?pet," + card.cardValue;
      }  
    console.log(card.children[0].src);

    card.addEventListener('click', function() {
      // If the card has already been matched, ignore it.
      if (card.classList.contains('is-matched') || card.classList.contains('is-selected') || isWaiting) {
        return;
      }

      // If we haven't selected 2 cards yet, add the current card to the
      // collection of selected cards and apply the correct CSS class.
      if (selectedCards.length < 2) {
        card.classList.add('is-selected');
        selectedCards.push(card);
      }

      // If we have selected two cards, see if they match.
      if (selectedCards.length === 2) {
        var card1 = selectedCards[0];
        var card2 = selectedCards[1];

        // If the cards match, add them to the collection of matched cards and
        // apply the correct CSS class.
        if (card1.cardValue === card2.cardValue) {
          matchedCards.push(card1, card2);
          card1.classList.add('is-matched');
          card2.classList.add('is-matched');
          card1.classList.remove('is-selected');
          card2.classList.remove('is-selected');
        }else{
          isWaiting = true;
          setTimeout(function(){ 
            isWaiting = false;
            card1.classList.remove('is-selected');
            card2.classList.remove('is-selected');
        }, 400);  
        }

        // Regardless of whether or not the cards match, deselect them and reset
        // the collection of matched cards.
    

        

        selectedCards = [];
      }

      // If we've matched all the cards, display a message.
      if (matchedCards.length >= cards.length) {
        alert('You matched all the cards, nice job!');
      }
    });
  });


}

window.addEventListener('DOMContentLoaded', function() {
  reloadBtn = document.getElementById(`reload-btn`);
  reloadBtn.addEventListener(`click`, loadGame)

  usernames = document.getElementsByClassName(`username-input`);
  usernames[0].value = `jrmykolyn`;
  usernames[1].value = `juneate`;
  usernames[2].value = ``;

  // This will let a little bit harder to cheat
  document.addEventListener('contextmenu', event => event.preventDefault());

  loadGame();
});


function shuffle(array) {
  let  currentIndex = array.length
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}