import { useState } from 'react';

function App() {
  const [grid, setGrid] = useState([[null, null, null], [null, null, null], [null, null, null]]);
  const [playerTurn, setPlayerTurn] = useState(true); // true = X, false = O
  const currentPlayer = playerTurn ? 'X' : 'O';

  // null = game in progress, "X" or "O" = winner, "Draw" =  no winner
  const [winner, setWinner] = useState(null); 

  const handleOnClick = (rowIndex, colIndex) => {
    // Do nothing if the cell is already filled or game is over
    if (grid[rowIndex][colIndex] !== null || winner) return;

    const updatedGrid = [...grid];
    updatedGrid[rowIndex][colIndex] = currentPlayer;  

    setGrid(updatedGrid); // Update grid after player's move

    if (checkWinner(updatedGrid)) {
      setWinner(currentPlayer);
    } else if (checkDraw(updatedGrid)) {
      setWinner('Draw');  
    } else {
      setPlayerTurn(!playerTurn); // Switch player turn
    }
  };

  const checkWinner = (grid) => {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (
        grid[i].every(cell => cell === currentPlayer) ||
        grid.every(row => row[i] === currentPlayer)
      ) {
        return true;
      }
    }

    // Check diagonals
    if (
      [0, 1, 2].every(index => grid[index][index] === currentPlayer) || 
      [0, 1, 2].every(index => grid[index][2 - index] === currentPlayer) 
    ) {
      return true;
    }

    return false;
  };

  // Check if the game is a draw
  const checkDraw = grid => grid.flat().every(cell => cell !== null);

  const resetGame = () => {
    // Reset grid and game state
    setGrid([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    setPlayerTurn(true);
    setWinner(null);
  };

  return (
    <div className="game">
    {!winner ? (
      <>
        <div className="grid">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="cell"
                  onClick={() => handleOnClick(rowIndex, colIndex)}
                >
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>
      </>
    ) : (
      <>
        <div className="result">
          <p>
            {winner === 'Draw' ? 'Empate!' : `Vencedor: ${winner}`}
          </p>
        </div>

        <button onClick={resetGame}>Reiniciar</button>
      </>
    )}
  </div>
);
}

export default App;
