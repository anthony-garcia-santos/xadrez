// src/types/game.ts

export interface Position { 
  row: number;
  col: number;
}


export type PieceType = 'developer' | 'designer' | 'product_owner';
export type PlayerColor = 'white' | 'black';

export interface Piece {
  type: PieceType;
  color: PlayerColor;
}

export interface Move {
  from: Position;
  to: Position;
}