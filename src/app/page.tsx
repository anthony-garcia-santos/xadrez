'use client';

import { useState } from 'react';
import { Game } from '@/libs/game';
import { Board } from '@/components/Gameboard';
import { Position } from '@/types/game';
import '../style/board.css';
import '../style/pieces.css';
import '../style/states.css';
import '../style/winnerModal.css';



export default function Home() {
  const [game, setGame] = useState(new Game());
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [showWinner, setShowWinner] = useState(false);

  const handleMove = (from: Position, to: Position) => {
    const newGame = new Game();
    Object.assign(newGame, game);

    if (newGame.makeMove(from, to)) {
      setGame(newGame);
      setSelectedPosition(null);
      
      if (newGame.gameOver) {
        setShowWinner(true);
      }
    }
  };

  const resetGame = () => {
    setGame(new Game());
    setSelectedPosition(null);
    setShowWinner(false);
  };

  return (
    <main className="game-container">
      {showWinner && (
        <div className="winner-modal">
          <div className="winner-content">
            <h2>🎉 {game.winner === 'white' ? 'White' : 'Black'} team wins! 🎉</h2>
            <button onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}

      <div className="game-info">
        <p>
          Current player: 
          <span className={`current-player ${game.currentPlayer}`}>
            {game.currentPlayer}
          </span>
        </p>
      </div>

      <Board
        game={game}
        onMove={handleMove}
        selectedPosition={selectedPosition}
        setSelectedPosition={setSelectedPosition}
        currentPlayer={game.currentPlayer}
      />
    </main>
  );
}