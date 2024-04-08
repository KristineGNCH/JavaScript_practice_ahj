/* eslint-disable no-plusplus */
/* eslint-disable linebreak-style */
export default class Board {
  constructor() {
    this.boardSize = 4;
    this.character = null;
  }

  drawBoard() {
    const board = document.createElement('div');
    const cell = document.createElement('div');
    board.classList.add('board');
    for (let i = 0; i < this.boardSize ** 2; i++) {
      cell.classList.add('cell');
      board.appendChild(cell);
    }
    this.board = board;
    return this.board;
  }

  getBoard() {
    this.drawBoard();
    return this.board;
  }
}
