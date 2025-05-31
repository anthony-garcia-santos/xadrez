//src/libs/board.ts

import { Piece, PieceType, PlayerColor, Position } from '@/types/game';

export class Board {
    size: number;
    grid: (Piece | null)[][];

    constructor(size: number = 8) {
        this.size = size;
        this.grid = Array.from({ length: size }, () => Array(size).fill(null));
        this.setupPieces();
    }

    private setupPieces(): void {
        this.setPiece(0, 7, { type: 'product_owner', color: 'black' });
        this.setPiece(0, 6, { type: 'developer', color: 'black' });
        this.setPiece(0, 5, { type: 'designer', color: 'black' });

        this.setPiece(7, 0, { type: 'product_owner', color: 'white' });
        this.setPiece(7, 1, { type: 'developer', color: 'white' });
        this.setPiece(7, 2, { type: 'designer', color: 'white' });
    }

    setPiece(row: number, col: number, piece: Piece | null): void {
        this.grid[row][col] = piece;
    }

    getPiece(position: Position): Piece | null {
        return this.grid[position.row][position.col];
    }

    isValidMove(from: Position, to: Position, currentPlayer: PlayerColor): boolean {
        const piece = this.getPiece(from);

        if (!piece || piece.color !== currentPlayer) return false;
        if (to.row < 0 || to.row >= this.size || to.col < 0 || to.col >= this.size) return false;

        const targetPiece = this.getPiece(to);
        if (targetPiece && targetPiece.color === currentPlayer) return false;

        return this.checkPieceMovement(piece, from, to);
    }

    private checkPieceMovement(piece: Piece, from: Position, to: Position): boolean {
        const rowDiff = Math.abs(to.row - from.row);
        const colDiff = Math.abs(to.col - from.col);

        switch (piece.type) {
            case 'product_owner':
                return rowDiff <= 1 && colDiff <= 1;

            case 'developer':
                if (rowDiff !== 0 && colDiff !== 0) return false;

                const rowStep = to.row > from.row ? 1 : to.row < from.row ? -1 : 0;
                const colStep = to.col > from.col ? 1 : to.col < from.col ? -1 : 0;

                let currentRow = from.row + rowStep;
                let currentCol = from.col + colStep;

                while (currentRow !== to.row || currentCol !== to.col) {
                    if (this.getPiece({ row: currentRow, col: currentCol }) !== null) return false;
                    currentRow += rowStep;
                    currentCol += colStep;
                }

                return true;

            case 'designer':
                return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);

            default:
                return false;
        }
    }

    movePiece(from: Position, to: Position): void {
        const piece = this.getPiece(from);
        this.setPiece(to.row, to.col, piece);
        this.setPiece(from.row, from.col, null);
    }
}
