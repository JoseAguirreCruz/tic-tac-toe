const playerX = 'x';
const playerO = 'circle';
const winningCombo = [  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6]
];

const squareEls = document.querySelectorAll('.square');
const boardEl = document.getElementById('board');
const winningMessageEl = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningTextEl = document.getElementById('winText');
const playAgainButton = document.createElement('button');
// playAgainButton.textContent = 'Play Again';
// winningMessageEl.appendChild(playAgainButton);
// playAgainButton.addEventListener('click', startGame);
// let confetti; 
let isPlayer_O_turn = false;
let winner = null;

restartButton.addEventListener('click', startGame);

function init() {
  startGame();
  winningMessageEl.addEventListener('animationend', removeConfetti);
}

function startGame() {
  const confettiCanvas = document.getElementById('confetti');
  if (confettiCanvas) {
    confettiCanvas.innerHTML = ''; // clear confetti canvas
  }
  if (confetti && typeof confetti.stop === 'function') {
    confetti.stop(); 
    confetti = null; 
  }
  isPlayer_O_turn = false;
  winner = null;
  squareEls.forEach(square => {
    square.classList.remove(playerX);
    square.classList.remove(playerO);
    square.removeEventListener('click', handleClick);
    square.addEventListener('click', handleClick, { once: true });
  });
  setBoardHover();
  winningMessageEl.classList.remove('show');
  const messageContainer = document.querySelector('.message-container');
  if (messageContainer) {
    document.body.removeChild(messageContainer);
  }
}


function removeConfetti() {
  const confettiEls = document.querySelectorAll('.confetti');
  confettiEls.forEach(confettiEl => confettiEl.remove());
}

function handleClick(evt) {
  const square = evt.target;
  const currentClass = isPlayer_O_turn ? playerO : playerX;
  placeMark(square, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapPlayer();
    setBoardHover();
  }
}

function endGame(draw) {
  if (draw) {
    winningTextEl.innerText = "It's a draw!";
  } else {
    winningTextEl.innerText = `Player ${isPlayer_O_turn ? "O" : "X"} wins!`;
    const message = document.createElement('div');
    message.innerText = winningTextEl.innerText;
    message.classList.add('message');
    const playAgainBtn = document.createElement('button');
    playAgainBtn.innerText = 'Play Again';
    playAgainBtn.classList.add('play-again-btn');
    playAgainBtn.addEventListener('click', () => {
      message.remove();
      playAgainBtn.remove();
      startGame();
    });
    const container = document.createElement('div');
    container.classList.add('message-container');
    container.appendChild(message);
    container.appendChild(playAgainBtn);
    document.body.appendChild(container);
    const confettiCanvas = document.getElementById('confetti');
      if (confettiCanvas) {
        const canvas = document.createElement('canvas');
        confettiCanvas.appendChild(canvas);
        const confettiSettings = { 
        target: canvas, 
        shapes: ['circle', 'square'],
        colors: [[165,104,246], [230,61,135], [0,199,228], [253,214,126]], 
        size: 2, 
        zIndex: 9999,
        origin: {x: 0.5, y: 0.2}
  }                           
  confetti = new ConfettiGenerator(confettiSettings);
  confetti.render();
}

  }
  winningMessageEl.classList.add('show');
}



function isDraw() {
  return [...squareEls].every(square => {
    return square.classList.contains(playerX) || square.classList.contains(playerO);
  });
}

function placeMark(square, currentClass) {
  square.classList.add(currentClass);
}

function swapPlayer() {
  isPlayer_O_turn = !isPlayer_O_turn;
}

function setBoardHover() {
  boardEl.classList.remove(playerX);
  boardEl.classList.remove(playerO);
  if (isPlayer_O_turn) {
    boardEl.classList.add(playerO);
  } else {
    boardEl.classList.add(playerX);
  }
}

function checkWin(currentClass) {
  return winningCombo.some(combination => {
    return combination.every(index => {
      return squareEls[index].classList.contains(currentClass);
    });
  });
}

const modal = document.getElementById('modal');
const playButton = document.getElementById('playButton');

window.addEventListener('load', () => {
  modal.classList.remove('hide');
});

playButton.addEventListener('click', () => {
  modal.classList.add('hide');
  startGame();
  // confetti.stop();
});

