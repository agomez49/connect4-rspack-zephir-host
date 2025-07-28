import React, { useState, Suspense } from 'react';
import clsx from 'clsx';

// Lazy load components that are not immediately needed
const WinnerMessage = React.lazy(() => import('./components/WinnerMessage'));
const RemoteToast = React.lazy(() => import('./components/remote/RemoteToast'));

const ROWS = 6;
const COLS = 7;
type Player = 'R' | 'Y' | null;

const App: React.FC = () => {
  const [board, setBoard] = useState<Player[][]>(
    Array.from({ length: ROWS }, () => Array(COLS).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState<Player>('R');
  const [winner, setWinner] = useState<Player>(null);
  const [showToast, setShowToast] = useState(false);

  const handleClick = (col: number) => {
    if (winner) return;

    const newBoard = board.map(row => [...row]);
    for (let row = ROWS - 1; row >= 0; row--) {
      if (!newBoard[row][col]) {
        newBoard[row][col] = currentPlayer;
        setBoard(newBoard);
        if (checkWinner(newBoard, row, col, currentPlayer)) {
          setWinner(currentPlayer);
          setShowToast(true);
        } else {
          setCurrentPlayer(currentPlayer === 'R' ? 'Y' : 'R');
        }
        break;
      }
    }
  };

  const checkWinner = (
    board: Player[][],
    row: number,
    col: number,
    player: Player
  ): boolean => {
    const directions = [
      [0, 1], [1, 0], [1, 1], [1, -1],
    ];
    for (const [dx, dy] of directions) {
      let count = 1;
      for (const dir of [-1, 1]) {
        let r = row + dx * dir;
        let c = col + dy * dir;
        while (
          r >= 0 && r < ROWS &&
          c >= 0 && c < COLS &&
          board[r][c] === player
        ) {
          count++;
          r += dx * dir;
          c += dy * dir;
        }
      }
      if (count >= 4) return true;
    }
    return false;
  };

  const reset = () => {
    setBoard(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
    setCurrentPlayer('R');
    setWinner(null);
    setShowToast(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 gap-8">
        {showToast && winner && (
          <Suspense fallback={<div className="fixed top-4 right-4 z-50 bg-gray-100 text-gray-800 p-2 rounded-lg shadow-md">Loading toast...</div>}>
            <RemoteToast
              message={`🎉 Player ${winner === 'R' ? 'Red' : 'Yellow'} Wins! (This is a Remote Component)`}
              type="success"
              duration={15000}
              onClose={() => setShowToast(false)}
            />
          </Suspense>
        )}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-center">Connect 4</h1>
          <div className="flex flex-col gap-1 bg-blue-700 p-2 rounded-lg shadow-lg">
            {board.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1">
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    onClick={() => handleClick(colIndex)}
                    className={clsx(
                      'w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all',
                      {
                        'bg-red-500': cell === 'R',
                        'bg-yellow-500': cell === 'Y',
                        'bg-white hover:bg-blue-300': !cell && !winner,
                        'bg-white': !cell && winner,
                      }
                    )}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="text-center space-y-2">
            {winner ? (
              <Suspense fallback={<div>Loading...</div>}>
                <WinnerMessage winner={winner} onReset={reset} />
              </Suspense>
            ) : (
              <p className="text-xl">
                Turn:{' '}
                <span
                  className={clsx('font-bold', {
                    'text-red-300': currentPlayer === 'R',
                    'text-yellow-300': currentPlayer === 'Y',
                  })}
                >
                  {currentPlayer === 'R' ? 'Red' : 'Yellow'}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
