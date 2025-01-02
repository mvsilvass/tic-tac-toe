import { useState } from 'react';

function App() {
  const [grid, setGrid] = useState([[null, null, null], [null, null, null], [null, null, null]]);
  const [playerTurn, setPlayerTurn] = useState(true); // true = X, false = O
  const currentPlayer = playerTurn ? 'X' : 'O'; // true = X, false = O
  const [winner, setWinner] = useState(null); // null = jogo em andamento, "X" ou "O" = vencedor, "Draw" = empate

  const handleOnClick = (rowIndex, colIndex) => {
    if (grid[rowIndex][colIndex] !== null || winner) return;

    const newGrid = [...grid];
    updateGrid(newGrid, rowIndex, colIndex, currentPlayer);

    setGrid(newGrid);

    if (checkWinner(newGrid)) {
      setWinner(currentPlayer);
    } else if (checkDraw(newGrid)) {
      setWinner('Draw');
    } else {
      setPlayerTurn(!playerTurn);
    }
  };

  const updateGrid = (grid, rowIndex, colIndex, player) => {
    grid[rowIndex][colIndex] = player;
  };

  const checkWinner = grid => {
    // Define o jogador com base no turno
    const currentPlayer = playerTurn ? 'X' : 'O';

    // Verificar linhas e colunas
    for (let i = 0; i < 3; i++) {
      if (
        grid[i].every(cell => cell === currentPlayer) || // Linha
        grid.every(row => row[i] === currentPlayer) // Coluna
      ) {
        return true;
      }
    }

    // Verificar diagonais
    if (
      [0, 1, 2].every(index => grid[index][index] === currentPlayer) || // Diagonal principal
      [0, 1, 2].every(index => grid[index][2 - index] === currentPlayer) // Diagonal secundária
    ) {
      return true;
    }

    return false;
  };

  // Verifica se houve empate
  const checkDraw = grid => grid.flat().every(cell => cell !== null);

  const resetGame = () => {
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
      <h1>Jogo da Velha</h1>
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="cell" onClick={() => handleOnClick(rowIndex, colIndex)}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={resetGame}>Reiniciar Jogo</button>

      {/* Display the winner */}
      {winner && (
        <div className="winner">
          {winner === 'Draw' ? 'Empate!' : `Vencedor: ${winner}`}
        </div>
      )}
    </div>
  );
}

export default App;
