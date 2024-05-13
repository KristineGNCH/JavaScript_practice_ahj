/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Board.js
/* eslint-disable no-plusplus */
/* eslint-disable linebreak-style */
class Board {
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
;// CONCATENATED MODULE: ./src/js/Character.js
/* eslint-disable linebreak-style */
class Character {
  constructor() {
    this.character = null;
  }
  createCharacter() {
    const character = document.createElement('div');
    character.classList.add('goblin');
    this.character = character;
  }
  getCharacter() {
    this.createCharacter();
    return this.character;
  }
}
;// CONCATENATED MODULE: ./src/js/Game.js
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
class Game {
  constructor(board, character) {
    this.board = board;
    this.boardSize = 4;
    this.character = character;
    this.activeCharacter = null;
  }
  newBoard() {
    const board = this.board.getBoard(this.boardSize);
    const body = document.querySelector('body');
    const container = document.createElement('div');
    container.classList.add('container');
    container.appendChild(board);
    body.insertBefore(container, body.firstChild);
    this.cells = [...board.children];
  }
  randomPosition() {
    const position = Math.floor(Math.random() * this.boardSize ** 2);
    if (position === this.position) {
      this.randomPosition();
      return;
    }
    this.deletedCharacter();
    this.position = position;
    this.adventCharacter();
  }
  deletedCharacter() {
    if (this.activeCharacter === null) {
      return;
    }
    this.cells[this.position].firstChild.remove();
  }
  adventCharacter() {
    this.activeCharacter = this.character.getCharacter();
    this.cells[this.position].appendChild(this.activeCharacter);
  }
  play() {
    setInterval(() => {
      this.randomPosition();
    }, 700);
  }
  start() {
    this.newBoard();
    this.play();
  }
}
;// CONCATENATED MODULE: ./src/js/startGame.js



const board = new Board();
const character = new Character();
const game = new Game(board, character);
game.start();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;