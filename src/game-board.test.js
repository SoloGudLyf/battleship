/* eslint-disable no-undef */
import Gameboard from "./game-board";
import Ship from "./ship";

describe("Gameboard class tests", () => {
  const gameBoard = new Gameboard();
  const ship = new Ship(3);
  test("place ship from A1 to A3", () => {
    expect(
      gameBoard.placeShip(ship, "A1", "A3")[0][0].length === ship.length &&
        gameBoard.placeShip(ship, "A1", "A3")[0][1].length === ship.length &&
        gameBoard.placeShip(ship, "A1", "A3")[0][2].length === ship.length,
    ).toBeTruthy();
  });

  test("place ship from A1 to C3", () => {
    expect(
      gameBoard.placeShip(ship, "A1", "C1")[0][0].length === ship.length &&
        gameBoard.placeShip(ship, "A1", "C1")[1][0].length === ship.length &&
        gameBoard.placeShip(ship, "A1", "C1")[2][0].length === ship.length,
    ).toBeTruthy();
  });
});
