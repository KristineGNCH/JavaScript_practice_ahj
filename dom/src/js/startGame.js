

import Board from './js/Board.js';
import Character from './js/Character.js';
import Game from './js/Board.js';

const board = new Board();
const character = new Character();
const game = new Game(board, character);

game.start();