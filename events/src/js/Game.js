/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import swal from "sweetalert";
export default class Game {
  constructor(board, character) {
    this.board = board;
    this.boardSize = 4;
    this.character = character;
    this.activeCharacter = null;
    this.position = null;
    this.goblinHit = 0;
    this.missedHit = 0;
    this.win = 5;
    this.lost = 5;
    this.cells = document.querySelectorAll(".cell");
    this.listeners = [];
  }

  newBoard() {
    this.board = this.board.getBoard(this.boardSize);
    const body = document.querySelector("body");
    const container = document.createElement("div");

    container.classList.add("container");
    container.innerHTML = "<h1 class ='title'>Статистика</h1>";
    this.statistic = this.statisticContainer();
    container.appendChild(this.statistic);
    container.appendChild(this.board);
    body.insertBefore(container, body.firstChild);
    this.cells = [...this.board.children];
  }

  randomPosition() {
    const position = Math.floor(Math.random() * this.boardSize * 2);
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
    this.activeCharacter = null;
  }

  adventCharacter() {
    this.activeCharacter = this.character.getCharacter();
    this.cells[this.position].appendChild(this.activeCharacter);
  }

  statisticContainer() {
    this.mainStatisticContainer = document.createElement("div");
    this.mainStatisticContainer.classList.add("status");
    this.mainStatisticContainer.innerHTML =
      'Поймано гоблинов: <span id="win">0</span><br>Пропущено гоблинов: <span id="lost">0</span>';
    return this.mainStatisticContainer;
  }

  play() {
    let intervalId;
    function gameLoop() {
      this.randomPosition();
    }
    intervalId = setInterval(gameLoop.bind(this), 700);
    this.start = () => {
      this.newBoard();
      clearInterval(intervalId);
      intervalId = setInterval(gameLoop.bind(this), 700);
    };
  }

  onBoardClick(e) {
    e.preventDefault();
    this.goblinHit = document.querySelector("#win");
    this.missedHit = document.querySelector("#lost");
    this.listeners.forEach((callback) => callback(e.target));

    if (e.target.classList.contains("goblin")) {
      this.goblinHit.textContent++;
      e.target.classList.remove("goblin");
    } else {
      this.missedHit.textContent++;
    }

    if (this.goblinHit.textContent >= this.win) {
      swal({
        title: "Поздравляем, Вы поймали 5 гоблинов",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      });
      this.newGame();
    } else if (this.missedHit.textContent >= this.lost) {
      swal({
        icon: "error",
        title: "Увы, Вы проиграли!",
      });
      this.newGame();
    }
  }

  newGame() {
    this.missedHit.textContent = 0;
    this.goblinHit.textContent = 0;
  }

  start() {
    this.newBoard();
    this.board.addEventListener("click", this.onBoardClick.bind(this));
    this.play();
  }
}
