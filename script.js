const submitBtn = document.getElementById("submit");
const player1Input = document.querySelector("#player1");
const player2Input = document.getElementById("player-2");
const setupDiv = document.getElementById("setup");
const gameDiv = document.getElementById("game");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "";
let board = Array(9).fill("");

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (player1 && player2) {
    setupDiv.style.display = "none";
    gameDiv.style.display = "block";
    currentPlayer = player1;
    currentSymbol = "X";
    messageDiv.textContent = `${currentPlayer}, you're up`;
  }
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const index = parseInt(cell.id) - 1;

    if (!board[index]) {
      board[index] = currentSymbol;
      cell.textContent = currentSymbol;

      if (checkWin()) {
        messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
        disableBoard();
      } else {
        switchPlayer();
      }
    }
  });
});

function switchPlayer() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
    currentSymbol = "O";
  } else {
    currentPlayer = player1;
    currentSymbol = "X";
  }
  messageDiv.textContent = `${currentPlayer}, you're up`;
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === currentSymbol)
  );
}

function disableBoard() {
  cells.forEach(cell => cell.style.pointerEvents = "none");
}
