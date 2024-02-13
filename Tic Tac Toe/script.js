const board = document.getElementById("game-board");
const popup = document.getElementById("popup");
const winnerMessage = document.getElementById("winner-message");
const newGameBtn = document.getElementById("new-game-btn");

const cells = [];
let currentPlayer = "X";
let gameActive = true;

// Create game board
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.id = i;
  cell.addEventListener("click", handleClick);
  board.appendChild(cell);
  cells.push(cell);
}

// Handle cell click
function handleClick() {
  const cell = this;
  const cellIndex = parseInt(cell.id);

  if (cell.textContent !== "" || !gameActive) return;

  cell.textContent = currentPlayer;
  checkGameStatus();

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Check game status
function checkGameStatus() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;

    if (
      cells[a].textContent !== "" &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      gameActive = false;
      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");
      showWinningAnimation();
      showPopup(cells[a].textContent + " Wins!");
      return;
    }
  }

  if (!cells.some((cell) => cell.textContent === "")) {
    gameActive = false;
    showPopup("It's a draw!");
  }
}

// Show winning celebration animation with sparkles
function showWinningAnimation() {
  const winningCells = document.querySelectorAll(".winner");
  winningCells.forEach((cell) => {
    cell.classList.add("celebrate");
    createSparkles(cell);
  });
}

// Create sparkles for the given cell
function createSparkles(cell) {
  const numSparkles = 4;
  for (let i = 0; i < numSparkles; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    cell.appendChild(sparkle);
  }
}

// Reset winning celebration animation
function resetWinningAnimation() {
  const winningCells = document.querySelectorAll(".celebrate");
  winningCells.forEach((cell) => {
    cell.classList.remove("celebrate");
    while (cell.firstChild) {
      cell.removeChild(cell.firstChild);
    }
  });
}

// Show popup with blur background
function showPopup(message) {
  winnerMessage.textContent = message;
  popup.classList.remove("hidden");
  document.body.classList.add("blur-background");
}

// Hide popup and remove blur background
function hidePopup() {
  popup.classList.add("hidden");
  document.body.classList.remove("blur-background");
}

// New game button click event
newGameBtn.addEventListener("click", () => {
  hidePopup();
  resetGame();
});

// Reset game
function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("winner");
  });
  resetWinningAnimation();
}
