import { Game } from '@/libs/game';
import { Position, PlayerColor } from '@/types/game';

export const getPossibleMoves = (
  game: Game,
  selectedPosition: Position,
  currentPlayer: PlayerColor
): Position[] => {
  const moves: Position[] = [];
  const piece = game.board.getPiece(selectedPosition);

  if (!piece) return moves;

  for (let r = 0; r < game.board.size; r++) {
    for (let c = 0; c < game.board.size; c++) {
      const target = { row: r, col: c };
      if (game.board.isValidMove(selectedPosition, target, currentPlayer)) {
        moves.push(target);
      }
    }
  }

  return moves;
};
