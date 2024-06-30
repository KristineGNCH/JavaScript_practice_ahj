/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
import Board from './Board';
import Character from './Character';
import Game from './Game';

const board = new Board();
const character = new Character();
const game = new Game(board, character);

game.start();