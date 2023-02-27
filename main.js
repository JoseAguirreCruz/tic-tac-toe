const playerX = 'x'
const playerO = 'circle'
const winningCombo = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6]
]

const squareEls = document.querySelectorAll('#square')
const boardEl = document.getElementById('board')
const winningMessageEl = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningTextEl = document.getElementById('winText')

let isPlayer_O_turn = false
let winner = null

startGame()

restartButton.addEventListener('click', startGame)
function startGame() {
  isPlayer_O_turn = false
  squareEls.forEach(square => {
    square.classList.remove(playerX)
    square.classList.remove(playerO)
    square.removeEventListener('click', handleClick)
    square.addEventListener('click', handleClick, {once: true})
  })
  setBoardHover()
  winningMessageEl.classList.remove('show')
}

function handleClick(evt) {
  const square = evt.target
  const currentClass = isPlayer_O_turn ? playerO : playerX
  placeMark(square, currentClass)
    if (checkWin(currentClass)) {
      endGame(false)
    } else if (isDraw()) {
      endGame(true)
    } else {
      swapPlayer()
      setBoardHover()
    }
}

function endGame(draw) {
  if (draw) {
    winningTextEl.innerText = "It's a draw!"
  } else {
    winningTextEl.innerText = `Player ${isPlayer_O_turn ? "O" : "X"} wins!`
  }
  winningMessageEl.classList.add('show')
}

function isDraw() {
  return [...squareEls].every(square => {
    return square.classList.contains(playerX) || square.classList.contains(playerO)
  })
}

function placeMark(square, currentClass) {
  square.classList.add(currentClass)
}
function swapPlayer() {
  isPlayer_O_turn = !isPlayer_O_turn
}

function setBoardHover() {
  boardEl.classList.remove(playerX)
  boardEl.classList.remove(playerO)
  if (isPlayer_O_turn) {
    boardEl.classList.add(playerO)
  } else {
    boardEl.classList.add(playerX)
  }
}