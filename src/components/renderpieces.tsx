import { Game } from '@/libs/game';

export const renderPiece = (game: Game, row: number, col: number) => {
  const piece = game.board.getPiece({ row, col });
  if (!piece) return null;

  const pieceImages = {
    developer: `/images/developer_${piece.color}.png`,
    designer: `/images/designer_${piece.color}.png`,
    product_owner: `/images/product_owner_${piece.color}.png`,
  };

  return (
    <img
      src={pieceImages[piece.type]}
      alt={`${piece.color} ${piece.type}`}
      className="piece-image"
    />
  );
};
