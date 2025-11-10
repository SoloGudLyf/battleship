import Gameboard from "./game-board";

export default class Player {
  constructor(name) {
    this.name = name;
    this.gameBoard = new Gameboard();
  }
}
