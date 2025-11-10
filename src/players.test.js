import Player from "./players";

describe("Test player constructor", () => {
  const myPlayer = new Player("myPlayer");

  test("generate player object", () => {
    expect(myPlayer.name === "myPlayer").toBeTruthy();
  });

  test("get player gameBoard", () => {
    expect(typeof myPlayer.gameBoard === "object").toBeTruthy();
  });
});
