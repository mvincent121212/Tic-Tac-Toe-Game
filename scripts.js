const gameStateDisplay = document.querySelector('.game-state');
let currentPlayer = 'O';
let currentPlayerTurn = () => `It is ${currentPlayer}'s turn.` 
let gameStateCells = ["","","","","","","","",""];
let numberofTurns = 0;
let gameActive = true;

gameStateDisplay.innerHTML = currentPlayerTurn();

function isCellClickInvalid (clickedCellEvent) {
    if (!gameActive) return true;
    const clickedCell = clickedCellEvent.target;
    const cellIndex = parseInt(clickedCell.getAttribute('id'));
    if (gameStateCells[cellIndex-1] !== "") {
        return true;
    }
    return false;
}

function handleCellClick(clickedCellEvent) {
    if (isCellClickInvalid(clickedCellEvent)) {
        return;
    }
    const cellObject = clickedCellEvent.target;
    const cellObjectIndex = parseInt(cellObject.getAttribute('id'));
    gameStateCells[cellObjectIndex-1] = currentPlayer;
    cellObject.innerHTML = currentPlayer;
    numberofTurns++;

    handleResultOfGame();
    handlePlayerSwitch();
}



function handlePlayerSwitch () {
    if (!gameActive) {
        return;
    }
    if (currentPlayer == 'O') {
        currentPlayer = 'X';
    }
    else {
        currentPlayer = 'O';
    }
    gameStateDisplay.innerHTML = currentPlayerTurn();
}

function handleResultOfGame () {
    let gameIsWon = false;
    const winConditions = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

    if (numberofTurns == 9) {
        gameStateDisplay.innerHTML = "The game is a draw.";
        gameActive = false;
        return;
    }


    for (let i = 0; i < 8 ; i++) {
        const currentWinCondition = winConditions[i];
        const cellA = gameStateCells[currentWinCondition[0]-1];
        const cellB = gameStateCells[currentWinCondition[1]-1];
        const cellC = gameStateCells[currentWinCondition[2]-1];
        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            gameIsWon = true;
            break;
        }
    
    }
    if (gameIsWon) {
        gameStateDisplay.innerHTML = `${currentPlayer} has won!`;
        gameActive = false;
    }
}

function handleRestartGame () {
    const cells = Array.from(document.querySelectorAll('.cell'));
    console.log(cells);

    for (let i = 0; i < cells.length ; i++) {
        cells[i].innerHTML = "";
    }

    gameStateCells = ["","","","","","","","",""];
    numberofTurns = 0;
    currentPlayer = 'O';
    gameStateDisplay.innerHTML = currentPlayerTurn();
    gameActive = true;

}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

document.querySelector('.reset').addEventListener('click', handleRestartGame);