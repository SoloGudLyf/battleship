import Player from "./players";
import Ship from "./ship";

const playerBoard = document.querySelector(".playerBoard");
const computerBoard = document.querySelector(".computerBoard");
const info = document.querySelector(".info");
let state = "player";

function generateGrid(board, arr) {
  const container = document.createElement("div");

  container.style.width = "200px";
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[1].length; j++) {
      const div = document.createElement("div");

      if (typeof arr[i][j] === "object") {
        div.classList.add("ship");
      }
      div.dataset.id = `${i}${j}`;

      div.style.width = "10%";
      div.style.height = "30px";
      div.addEventListener("click", shot);
      container.appendChild(div);
    }
  }
  board.appendChild(container);
}

const player = new Player("Solo");
const ship = new Ship(3);
player.gameBoard.placeShip(ship, "A1", "A3");
generateGrid(playerBoard, player.gameBoard.gameboardArr);

const computer = new Player("Computer");
const computerShip = new Ship(3);
computer.gameBoard.placeShip(computerShip, "C1", "E1");
generateGrid(computerBoard, computer.gameBoard.gameboardArr);

function shot(e) {

  let gridIndex = Array.from(e.target.dataset.id);
  gridIndex = [Number(gridIndex[0]), Number(gridIndex[1])];
  if (state === "player") {
    if (
      !computerBoard.childNodes[3].contains(e.target) ||
      (e.target.classList.value !== "" && e.target.classList.value !== "ship")
    )
      return;
    if (
      typeof computer.gameBoard.gameboardArr[gridIndex[0]][gridIndex[1]] ===
      "object"
    ) {
      e.target.classList.add("hit");
    } else {
      e.target.classList.add("missed");
      e.target.textContent = ".";
    }

    computer.gameBoard.receiveAttack(gridIndex);

    state = "computer";
    info.textContent = "It's computer's turn";
    return;
  }
  if (state === "computer") {
    if (
      !playerBoard.childNodes[1].contains(e.target) ||
      (e.target.classList.value !== "" && e.target.classList.value !== "ship")
    )
      return;
    computerChoice();

    state = "player";
    info.textContent = "It's player's turn";
    return;
  }
}

function computerChoice() {
  let choice = Math.floor(Math.random() * 99) + 1;
  (document.querySelector(`.playerBoard div :nth-child(100)`));

  let element = document.querySelector(
    `.playerBoard div :nth-child(${choice})`,
  );
  while (element.classList.value !== "" && element.classList.value !== "ship") {
    choice = Math.floor(Math.random() * 99) + 1;


    element = document.querySelector(`.playerBoard div :nth-child(${choice})`);
  }

  let choiceArr = Array.from(String(choice - 1));
  choiceArr = [Number(choiceArr[0]), Number(choiceArr[1])];

  choiceArr[1] = Number.isNaN(choiceArr[1]) ? 0 : choiceArr[1];

  if (
    typeof player.gameBoard.gameboardArr[choiceArr[0]][choiceArr[1]] ===
    "object"
  ) {

    element.classList.add("hit");
  } else {
    element.classList.add("missed");
    element.textContent = ".";
  }

  player.gameBoard.receiveAttack(choiceArr);
}
computerChoice();
