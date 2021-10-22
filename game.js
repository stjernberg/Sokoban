const gameBoard = document.getElementById("boardContainer");
const playerPosition = {
  x: 0,
  y: 0,
};
const goals = 0;

const createGameBoard = () => {
  for (let col = 0; col < tileMap01.height; col++) {
    for (let row = 0; row < tileMap01.width; row++) {
      const oneTile = document.createElement("div");
      oneTile.classList.add("tile");
      oneTile.id = row + "," + col;
      const cell = tileMap01.mapGrid[col][row].toString();

      switch (cell) {
        case " ":
          oneTile.classList.add("tile-space");
          break;
        case "W":
          oneTile.classList.add("tile-wall");
          break;
        case "B":
          oneTile.classList.add("entity-block");
          break;
        case "P":
          oneTile.classList.add("entity-player");
          //set the player position
          playerPosition.x = row;
          playerPosition.y = col;
          break;
        case "G":
          oneTile.classList.add("tile-goal");
          break;
        default:
          break;
      }

      gameBoard.appendChild(oneTile);
      document.addEventListener("keydown", arrowKeys);
    }
  }
};

const arrowKeys = (e) => {
  //console.log("event", e);
  switch (e.keyCode) {
    case 38:
      // up arrow
      console.log("up");
      movePlayer(0, -1);
      break;
    case 40:
      // down arrow
      movePlayer(0, 1);
      console.log("down");
      break;
    case 37:
      //  left arrow
      movePlayer(-1, 0);
      console.log("left");
      break;
    case 39:
      // right arrow
      movePlayer(1, 0);
      console.log("right");
      break;
  }
};

const movePlayer = (x, y) => {
  let nextPosition = document.getElementById(
    playerPosition.x + x + "," + (playerPosition.y + y)
  );

  let currentPosition = document.getElementById(
    playerPosition.x + "," + playerPosition.y
  );

  let nextBlockPosition = document.getElementById(
    playerPosition.x + x * 2 + "," + (playerPosition.y + y * 2)
  );

  if (nextPosition.classList.contains("entity-block")) {
    if (
      !(
        nextBlockPosition.classList.contains("tile-wall") ||
        nextBlockPosition.classList.contains("entity-block")
      )
    ) {
      nextBlockPosition.classList.add("entity-block");
      nextPosition.classList.remove("entity-block");
      nextPosition.classList.add("entity-player");
      currentPosition.classList.remove("entity-player");

      playerPosition.x += x;
      playerPosition.y += y;
    }
  } else {
    if (!nextPosition.classList.contains("tile-wall")) {
      nextPosition.classList.add("entity-player");
      currentPosition.classList.remove("entity-player");
      playerPosition.x += x;
      playerPosition.y += y;
    }
  }
};

createGameBoard();
