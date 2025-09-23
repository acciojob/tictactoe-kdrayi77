const submitBtn = document.getElementById("submit");
const gameDiv = document.getElementById("game");
const formDiv = document.getElementById("player-form");
const messageDiv = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restart");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let gameActive = true;

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value || "Player 1";
  player2 = document.getElementById("player2").value || "Player 2";
  currentPlayer = player1;
  formDiv.style.display = "none";
  gameDiv.style.display = "block";
  messageDiv.textContent = `${currentPlayer}, you're up`;
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    if (!gameActive || cell.textContent !== "") return;

    cell.textContent = currentSymbol;

    if (checkWin()) {
      messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
      gameActive = false;
      restartBtn.style.display = "inline-block";
      return;
    }

    if ([...cells].every(c => c.textContent !== "")) {
      messageDiv.textContent = "It's a draw!";
      gameActive = false;
      restartBtn.style.display = "inline-block";
      return;
    }

    // Switch turn
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

restartBtn.addEventListener("click", () => {
  cells.forEach(cell => (cell.textContent = ""));
  gameActive = true;
  currentPlayer = player1;
  currentSymbol = "X";
  messageDiv.textContent = `${currentPlayer}, you're up`;
  restartBtn.style.display = "none";
});

function checkWin() {
  const winPatterns = [
    [1,2,3], [4,5,6], [7,8,9], // rows
    [1,4,7], [2,5,8], [3,6,9], // cols
    [1,5,9], [3,5,7]           // diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return (
      document.getElementById(a).textContent === currentSymbol &&
      document.getElementById(b).textContent === currentSymbol &&
      document.getElementById(c).textContent === currentSymbol
    );
  });
}
