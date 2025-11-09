/* eslint-disable no-undef */
import Gameboard from "./game-board";
import Ship from "./ship";

describe("Gameboard class tests", () => {
  const gameBoard = new Gameboard();
  const ship = new Ship(3);
  describe("Place ship", () => {
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

    describe("receive attack", () => {
      test("receive attack on A1", () => {
        expect(gameBoard.receiveAttack("A1").hitTimes > 0).toBeTruthy();
      });

      test("receive missed attack on A8", () => {
        expect(gameBoard.receiveAttack("A8 ") === "X").toBeTruthy();
      });
    });
  });
});
