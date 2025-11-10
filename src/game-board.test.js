/* eslint-disable no-undef */
import Gameboard from "./game-board";
import Ship from "./ship";

describe("Gameboard class tests", () => {
  // Tests for placing ships
  describe("Place ship", () => {
    test("place ship row wise", () => {
      const placeGameBoard = new Gameboard();
      const placeShip = new Ship(3);

      expect(
        placeGameBoard.placeShip(placeShip, "A1", "C1")[0][0].length ===
          placeShip.length &&
          placeGameBoard.placeShip(placeShip, "D1", "F1")[0][1].length ===
            placeShip.length &&
          placeGameBoard.placeShip(placeShip, "G1", "I1")[0][2].length ===
            placeShip.length,
      ).toBeTruthy();
    });

    test("place ship column wise", () => {
      const placeGameBoard = new Gameboard();
      const placeShip = new Ship(3);
      expect(
        placeGameBoard.placeShip(placeShip, "A1", "A3")[1][0].length ===
          placeShip.length &&
          placeGameBoard.placeShip(placeShip, "B1", "B3")[0][1].length ===
            placeShip.length &&
          placeGameBoard.placeShip(placeShip, "C1", "C3")[2][2].length ===
            placeShip.length,
      ).toBeTruthy();
    });

    test("Avoid placing multiple ships on same spot", () => {
      const placeGameBoard = new Gameboard();
      const placeShip = new Ship(3);
      placeGameBoard.placeShip(placeShip, "A1", "A3");
      expect(
        typeof placeGameBoard.placeShip(placeShip, "A1", "A3")[0][0] ===
          "string",
      ).toBeTruthy();
    });
  });

  // Tests for attacking ship
  describe("receive attack", () => {
    const gameBoard = new Gameboard();
    const ship = new Ship(3);
    gameBoard.placeShip(ship, "A1", "A3");
    test("receive attack on A1", () => {
      expect(gameBoard.receiveAttack("A1").hitTimes > 0).toBeTruthy();
    });

    test("receive missed attack on A8", () => {
      expect(gameBoard.receiveAttack("A8 ") === "X").toBeTruthy();
    });
  });

  // Tests for checking if all ships on board have been sunk
  describe("all ships sunk", () => {
    const newGameBoard = new Gameboard();
    const newShip = new Ship(3);
    newGameBoard.placeShip(newShip, "A1", "A3");
    test("ships not sunk", () => {
      newGameBoard.receiveAttack("A1");
      expect(newGameBoard.isSunk()).not.toBeTruthy();
    });

    test("ships sunk", () => {
      newGameBoard.receiveAttack("A2");
      newGameBoard.receiveAttack("A3");
      newShip.hitTimes;

      expect(newGameBoard.isSunk()).toBeTruthy();
    });
  });
});
