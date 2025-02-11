// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const restartButton = document.getElementById("restart");

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const handleResultValidation = () => {
        let roundWon = false;
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `Player ${currentPlayer} wins!`;
            isGameActive = false;
            return;
        }

        if (!board.includes("")) {
            statusText.textContent = "It's a draw!";
            isGameActive = false;
        }
    };

    const handleCellClick = (e) => {
        const clickedCell = e.target;
        const clickedIndex = clickedCell.getAttribute("data-index");

        if (board[clickedIndex] !== "" || !isGameActive) return;

        board[clickedIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        handleResultValidation();

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (isGameActive) {
            statusText.textContent = `Player ${currentPlayer}'s turn`;
        }
    };

    const restartGame = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        isGameActive = true;
        currentPlayer = "X";
        statusText.textContent = `Player X's turn`;

        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("taken");
        });
    };

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartButton.addEventListener("click", restartGame);
});
