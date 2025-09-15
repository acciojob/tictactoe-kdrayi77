 const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const playerInputsDiv = document.getElementById("player-inputs");
const gameDiv = document.getElementById("game");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let board = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value || "Player 1";
  player2 = player2Input.value || "Player 2";
  currentPlayer = player1;
  messageDiv.textContent = `${currentPlayer}, you're up`;
  playerInputsDiv.style.display = "none";
  gameDiv.style.display = "block";
});

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (board[index] === "") {
      board[index] = currentSymbol;
      cell.textContent = currentSymbol;

      if (checkWinner()) {
        messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
        cells.forEach(c => c.style.pointerEvents = "none");
        return;
      }

      // Switch player
      if (currentPlayer === player1) {
        currentPlayer = player2;
        currentSymbol = "O";
      } else {
        currentPlayer = player1;
        currentSymbol = "X";
      }
      messageDiv.textContent = `${currentPlayer}, you're up`;
    }
  });
});
