import Player from "./players";
import Ship from "./ship";

const playerBoard = document.querySelector(".playerBoard");
const computerBoard = document.querySelector(".computerBoard");

function generateGrid(arr) {
  const container = document.createElement("div");
  container.style.width = "40vw";
  for (const subarr of arr) {
    for (let element of subarr) {
      const div = document.createElement("div");

      element = typeof element === "object" ? "X" : "O";
      div.textContent = element;
      console.log(element);

      div.style.width = "10%";
      container.appendChild(div);
    }
  }
  playerBoard.appendChild(container);
}
