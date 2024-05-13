/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
export default class Game {
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
