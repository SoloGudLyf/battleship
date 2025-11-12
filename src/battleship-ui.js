import Player from "./players";
import Ship from "./ship";

const playerBoard = document.querySelector(".playerBoard");
const computerBoard = document.querySelector(".computerBoard");
const playerSpace = document.querySelector(".playerBattleSpace");
const computerSpace = document.querySelector(".computerBattleSpace");
const info = document.querySelector(".info");
const rdmPlacementBtn = document.querySelector(".randomPlacement");
let state = "player";

rdmPlacementBtn.addEventListener("click", () => {
  randomPlacement();
  randomPlacement(computer);
});

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

const computer = new Player("Computer");

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
    checkGameEnd();
    return;
  }
  if (state === "computer") {
    if (
      !playerBoard.childNodes[2].contains(e.target) ||
      (e.target.classList.value !== "" && e.target.classList.value !== "ship")
    )
      return;
    computerChoice();

    state = "player";
    info.textContent = "It's player's turn";
    checkGameEnd();
    return;
  }
}

function computerChoice() {
  let choice = Math.floor(Math.random() * 99) + 1;
  document.querySelector(`.playerBoard div :nth-child(100)`);

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

function randomPlacement(realPlayer = player) {
  if (realPlayer === computer) {

    computerSpace.textContent = "";
    computer.gameBoard.gameboardArr = computer.gameBoard.getboard();
  } else if (realPlayer === player) {

    player.gameBoard.gameboardArr = player.gameBoard.getboard();

    playerSpace.textContent = "";
  }
  for (let i = 1; i < 11; i++) {
    let chooseSet = Math.floor(Math.random() * 2);
    if (chooseSet === 0 && i === 1) {
      set1(realPlayer, 3);
    } else if (chooseSet === 1 && i === 1) {
      set2(realPlayer, 3);
    } else if (chooseSet === 0 && i === 2) {
      set1(realPlayer, 2);
    } else if (chooseSet === 1 && i === 2) {
      set2(realPlayer, 2);
    } else if (chooseSet === 0 && i === 3) {
      set1(realPlayer, 1);
    } else if (chooseSet === 1 && i === 3) {
      set2(realPlayer, 1);
    } else if (chooseSet === 0 && i === 4) {
      set1(realPlayer, 2);
    } else if (chooseSet === 1 && i === 4) {
      set2(realPlayer, 2);
    } else if (chooseSet === 0 && i === 5) {
      set1(realPlayer, 3);
    } else if (chooseSet === 1 && i === 5) {
      set2(realPlayer, 3);
    } else if (chooseSet === 0 && i === 6) {
      set1(realPlayer, 1);
    } else if (chooseSet === 1 && i === 6) {
      set2(realPlayer, 1);
    } else if (chooseSet === 0 && i === 7) {
      set1(realPlayer, 4);
    } else if (chooseSet === 1 && i === 7) {
      set2(realPlayer, 4);
    } else if (chooseSet === 0 && i === 8) {
      set1(realPlayer, 2);
    } else if (chooseSet === 1 && i === 8) {
      set2(realPlayer, 2);
    } else if (chooseSet === 0 && i === 9) {
      set1(realPlayer, 1);
    } else if (chooseSet === 1 && i === 9) {
      set2(realPlayer, 1);
    } else if (chooseSet === 0 && i === 10) {
      set1(realPlayer, 1);
    } else if (chooseSet === 1 && i === 10) {
      set2(realPlayer, 1);
    }
  }
  if (realPlayer === player) {
    playerSpace.textContent = "";
    generateGrid(playerSpace, realPlayer.gameBoard.gameboardArr);
  }
  if (realPlayer === computer) {
    computerSpace.textContent = "";

    generateGrid(computerSpace, realPlayer.gameBoard.gameboardArr);
  }
}

function set1(player, num) {
  let firstLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  let randomLetter =
    firstLetter[Math.floor(Math.random() * firstLetter.length)];
  let randomNumber = Math.floor(Math.random() * (firstLetter.length / 2));
  let index = player.gameBoard.getPos(`${randomLetter}${randomNumber}`);

  while (
    typeof player.gameBoard.gameboardArr[index[0]][index[1]] === "object"
  ) {
    randomLetter = firstLetter[Math.floor(Math.random() * firstLetter.length)];
    randomNumber = Math.floor(Math.random() * (firstLetter.length / 2));

    index = player.gameBoard.getPos(`${randomLetter}${randomNumber}`);
  }
  player.gameBoard.placeShip(
    new Ship(num),
    `${randomLetter}${randomNumber}`,
    `${randomLetter}${randomNumber + num - 1}`,
  );
  return;
}

function set2(player, num) {
  let firstLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  let randomLetter = Math.floor(Math.random() * (firstLetter.length / 2));

  let randomNumber = Math.floor(Math.random() * firstLetter.length);

  let index = player.gameBoard.getPos(
    `${firstLetter[randomLetter]}${randomNumber}`,
  );

  while (
    typeof player.gameBoard.gameboardArr[index[0]][index[1]] === "object"
  ) {
    randomLetter = Math.floor(Math.random() * (firstLetter.length / 2));

    randomNumber = Math.floor(Math.random() * firstLetter.length);

    index = player.gameBoard.getPos(
      `${firstLetter[randomLetter]}${randomNumber}`,
    );
  }
  player.gameBoard.placeShip(
    new Ship(num),
    `${firstLetter[randomLetter]}${randomNumber}`,
    `${firstLetter[randomLetter + (num - 1)]}${randomNumber}`,
  );
}

randomPlacement(computer);
randomPlacement(player);

function checkGameEnd() {
  if (player.gameBoard.isSunk()) {
    info.textContent = "Game Over, computer wins";
    for (const element of document.querySelector(".computerBattleSpace div")
      .childNodes) {
      element.removeEventListener("click", shot);
    }

    for (const element of document.querySelector(".playerBattleSpace div")
      .childNodes) {
      element.removeEventListener("click", shot);
    }
  } else if (computer.gameBoard.isSunk()) {
    info.textContent = "Game Over, You win";
    for (const element of document.querySelector(".computerBattleSpace div")
      .childNodes) {
      element.removeEventListener("click", shot);
    }
    for (const element of document.querySelector(".playerBattleSpace div")
      .childNodes) {
      element.removeEventListener("click", shot);
    }
  }
}
