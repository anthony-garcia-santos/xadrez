import { PlayerColor, Position } from '@/types/game';
import { Board } from './board';

export class Game {
    board: Board;
    currentPlayer: PlayerColor;
    gameOver: boolean;
    winner: PlayerColor | null;

    constructor() {
        this.board = new Board();
        this.currentPlayer = 'white';
        this.gameOver = false;
        this.winner = null;
    }

    makeMove(from: Position, to: Position): boolean {
        if (this.gameOver) return false;
        if (!this.board.isValidMove(from, to, this.currentPlayer)) return false;

        const targetPiece = this.board.getPiece(to);
        if (targetPiece?.type === 'product_owner') {
            this.gameOver = true;
            this.winner = this.currentPlayer;
        }

        this.board.movePiece(from, to);
        this.switchPlayer();
        return true;
    }

    private switchPlayer(): void {
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    }
}
