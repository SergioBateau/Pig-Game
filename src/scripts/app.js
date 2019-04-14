var scores, roundScore, activePlayer, dice, gamePlaying;

init();

document.querySelector(".btn-roll").addEventListener("click", function() {
  if(gamePlaying) {
        // 1.random number
    dice = Math.floor(Math.random() * 6) + 1;

    // 2. display result
    var diceDOM = document.querySelector('.dice');
    
    diceDOM.style.display = 'block';
    var pick = 'dice-' + dice + '.png'; // название картинки
    
    var src = './images/'; // доступ к картинкам
    
    diceDOM.src = src + pick; // склеиваем
    
    //3. update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
        // Add score
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

      } else {
        // next player
        nextPlayer();
      }
    }

});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
      // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;


    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player wom the game
    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
  
});

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // если activeplayer был первый, то ставим 1 (переход хода), если activeplayer был второй, то ставим 0
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0'; // обнуляем очки

  document.querySelector('.player-0-panel').classList.toggle('active'); // меняет активного игрока
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = "none";

  document.getElementById('score-0').textContent = "0";
  document.getElementById('score-1').textContent = "0";
  document.getElementById('current-0').textContent = "0";
  document.getElementById('current-1').textContent = "0";
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}