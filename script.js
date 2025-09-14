const submitBtn = document.getElementById("submit");
const playerInputs = document.getElementById("player-inputs");
const gameSection = document.getElementById("game");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restart");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let gameActive = true;

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9], // rows
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9], // cols
  [1, 5, 9],
  [3, 5, 7]  // diagonals
];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value || "Player 1";
  player2 = document.getElementById("player2").value || "Player 2";
  currentPlayer = player1;
  playerInputs.classList.add("hidden");
  gameSection.classList.remove("hidden");
  messageDiv.textContent = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.textContent !== "") return;
    cell.textContent = currentSymbol;
    cell.classList.add("taken");
    
    if (checkWinner(currentSymbol)) {
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      gameActive = false;
      return;
    }

    if (isDraw()) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
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
  });
});

restartBtn.addEventListener("click", resetGame);

function checkWinner(symbol) {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (
      document.getElementById(a).textContent === symbol &&
      document.getElementById(b).textContent === symbol &&
      document.getElementById(c).textContent === symbol
    ) {
      document.getElementById(a).classList.add("winner");
      document.getElementById(b).classList.add("winner");
      document.getElementById(c).classList.add("winner");
      return true;
    }
  }
  return false;
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== "");
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken", "winner");
  });
  currentPlayer = player1;
  currentSymbol = "X";
  gameActive = true;
  messageDiv.textContent = `${currentPlayer}, you're up`;
}
