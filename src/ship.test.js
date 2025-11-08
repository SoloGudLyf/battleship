/* eslint-disable no-undef */
import Ship from "./ship";

describe("Ship module", () => {
  const ship = new Ship(3);

  test("get ship length", () => {
    expect(ship.length).toBe(3);
  });

  test("hit ship", () => {
    ship.isHit();
    expect(ship.hitTimes).toBe(1);
  });

  test("Hit ship twice", () => {
    ship.hitTimes = 0;
    ship.isHit();
    ship.isHit();
    expect(ship.hitTimes).toBe(2);
  });

  test("Check isHits", () => {
    ship.isHit();
    ship.isHit();
    expect(ship.hitTimes).toBe(3);
  });

  test("sink ship", () => {
    expect(ship.isSunk()).toBe(true);
  });
});
