export default class Gameboard {
  gameboardArr = this.getboard();

  // Generating board array
  getboard() {
    const gameBoardArr = [];
    for (let index = 0; index < 10; index++) {
      gameBoardArr.push([]);
      for (let j = 0; j < 10; j++) {
        gameBoardArr[index].push("");
      }
    }
    return gameBoardArr;
  }

  // Placing ships at specific coordinate
  placeShip(ship, startPos, endPos) {
    startPos = this.getPos(startPos);
    endPos = this.getPos(endPos);
    {
      if (
        this.checkInputValidity(ship.length, startPos, endPos) ===
        "Column placing"
      ) {
        for (let index = 0; index < ship.length; index++) {
          if (this.gameboardArr[startPos[0] + index][startPos[1]].length > 0)
            return "Place already occupied";
          this.gameboardArr[startPos[0] + index][startPos[1]] = ship;
        }
      } else if (
        this.checkInputValidity(ship.length, startPos, endPos) === "Row placing"
      ) {
        for (let index = 0; index < ship.length; index++) {
          if (this.gameboardArr[startPos[0]][startPos[1] + index].length > 0)
            return "Place already occupied";
          this.gameboardArr[startPos[0]][startPos[1] + index] = ship;
        }
      } else {
        return "Invalid Input";
      }
      return this.gameboardArr;
    }
  }

  checkInputValidity(length, startPos, endPos) {
    if (startPos[1] === endPos[1] && endPos[0] + 1 - startPos[0] === length) {
      return "Column placing";
    } else if (
      startPos[0] === endPos[0] &&
      endPos[1] + 1 - startPos[1] === length
    ) {
      return "Row placing";
    }
    return false;
  }

  // Extracting exact position from given input
  getPos(position) {
    const positionArr = Array.from(position);
    let modifiedposition = [];
    switch (positionArr[0].toUpperCase()) {
      case "A":
        modifiedposition.push(0);
        break;

      case "B":
        modifiedposition.push(1);
        break;
      case "C":
        modifiedposition.push(2);
        break;
      case "D":
        modifiedposition.push(3);
        break;
      case "E":
        modifiedposition.push(4);
        break;
      case "F":
        modifiedposition.push(5);
        break;
      case "G":
        modifiedposition.push(6);
        break;
      case "H":
        modifiedposition.push(7);
        break;
      case "I":
        modifiedposition.push(8);
        break;
      case "J":
        modifiedposition.push(9);
        break;

      default:
        return "Invalid";
    }
    if (positionArr.length === 3) {
      const secondVal = Number(positionArr[1] + positionArr[2]) - 1;
      modifiedposition.push(secondVal);
      modifiedposition = [modifiedposition[1], modifiedposition[0]];
      return modifiedposition;
    }
    const secondVal = Number(positionArr[1]) - 1;
    modifiedposition.push(secondVal);
    modifiedposition = [modifiedposition[1], modifiedposition[0]];
    return modifiedposition;
  }

  // Attacking specific positions on board
  receiveAttack(pos) {
    pos = typeof pos === "object" ? pos : this.getPos(pos);
    let boardPos = this.gameboardArr[pos[0]][pos[1]];

    if (boardPos === undefined) return "Invalid Input";

    if (boardPos.length > 0) {
      boardPos.isHit();
    } else {
      this.gameboardArr[pos[0]][pos[1]] = "X";
    }

    return this.gameboardArr[pos[0]][pos[1]];
  }

  isSunk() {
    let isSunk = false;
    for (const row of this.gameboardArr) {
      for (const element of row) {
        if (element.length > 0 && typeof element !== "string") {
          element;

          if (!element.isSunk()) return false;
          isSunk = element.isSunk();
        }
      }
      return isSunk;
    }
    isSunk;
    this.gameboardArr;

    return isSunk;
  }
}
