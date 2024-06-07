const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const messageDisplay = document.getElementById('message');
let isXNext = true;
let boardState = Array(9).fill(null);

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(cell, index));
});

resetButton.addEventListener('click', resetGame);

function handleClick(cell, index) {
    if (cell.textContent || checkWinner() || isBoardFull()) return;

    boardState[index] = isXNext ? 'X' : 'O';
    cell.textContent = boardState[index];
    cell.classList.add(boardState[index]);

    if (checkWinner()) {
        highlightWinningCells(checkWinner());
        messageDisplay.textContent = `${boardState[index]} wins!`;
    } else if (isBoardFull()) {
        handleDraw();
    } else {
        isXNext = !isXNext;
    }
}

function checkWinner() {
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
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return combination;
        }
    }
    return null;
}

function highlightWinningCells(combination) {
    combination.forEach(index => {
        cells[index].classList.add('winning-cell');
    });
}

function isBoardFull() {
    return boardState.every(cell => cell !== null);
}

function handleDraw() {
    messageDisplay.textContent = "It's a draw!";
}

function resetGame() {
    boardState.fill(null);
    isXNext = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O', 'winning-cell');
    });
    messageDisplay.textContent = '';
}
