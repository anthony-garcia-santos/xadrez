import { useState, useEffect } from 'react';
import { Game } from '@/libs/game';
import { Position, PlayerColor } from '@/types/game';
import { getPossibleMoves } from './helpers';
import { renderPiece } from './renderpieces';
import '../style/board.css';
import '../style/pieces.css';
import '../style/states.css';

interface BoardProps {
  game: Game;
  onMove: (from: Position, to: Position) => void;
  selectedPosition: Position | null;
  setSelectedPosition: (pos: Position | null) => void;
  currentPlayer: PlayerColor;
}

export const Board: React.FC<BoardProps> = ({
  game,
  onMove,
  selectedPosition,
  setSelectedPosition,
  currentPlayer,
}) => {
  const [possibleMoves, setPossibleMoves] = useState<Position[]>([]);

  useEffect(() => {
    setPossibleMoves(
      selectedPosition
        ? getPossibleMoves(game, selectedPosition, currentPlayer)
        : []
    );
  }, [selectedPosition, game, currentPlayer]);

  const handleClick = (row: number, col: number) => {
    const clickedPosition = { row, col };
    const piece = game.board.getPiece(clickedPosition);

    if (selectedPosition) {
      if (game.board.isValidMove(selectedPosition, clickedPosition, currentPlayer)) {
        onMove(selectedPosition, clickedPosition);
      }
      setSelectedPosition(null);
    } else if (piece && piece.color === currentPlayer) {
      setSelectedPosition(clickedPosition);
    }
  };

  return (
    <div className="board">
      {game.board.grid.map((row, rowIndex) =>
        row.map((_, colIndex) => {
          const isLight = (rowIndex + colIndex) % 2 === 0;
          const isSelected =
            selectedPosition?.row === rowIndex && selectedPosition?.col === colIndex;
          const isPossibleMove = possibleMoves.some(
            move => move.row === rowIndex && move.col === colIndex
          );

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleClick(rowIndex, colIndex)}
              className={`cell ${isLight ? 'cell-light' : 'cell-dark'} ${
                isSelected ? 'cell-selected' : ''
              }`}
            >
              {renderPiece(game, rowIndex, colIndex)}
              {isPossibleMove && !game.board.getPiece({ row: rowIndex, col: colIndex }) && (
                <div className="move-indicator" />
              )}
            </div>
          );
        })
      )}
    </div>
  );
};
