const gameBoard = document.getElementById("boardContainer");
let score = 0;
document.getElementById("score").innerHTML = "Score: " + score;
const maxScore = 2;

const playerPosition = {
  x: 0,
  y: 0,
};

const newGame = () => {
  gameBoard.innerHTML = "";
  document.getElementById("won").innerHTML = "";
  score = 0;
  document.getElementById("score").innerHTML = "Score: " + "";
  createGameBoard();
};

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

const arrowKeys = (event) => {
  event.preventDefault();
  switch (event.keyCode) {
    case 38:
      // up arrow
      movePlayer(0, -1);
      break;
    case 40:
      // down arrow
      movePlayer(0, 1);
      break;
    case 37:
      //  left arrow
      movePlayer(-1, 0);
      break;
    case 39:
      // right arrow
      movePlayer(1, 0);
      break;
  }
};

const movePlayer = (x, y) => {
  //Current position of the player
  let currentPosition = document.getElementById(
    playerPosition.x + "," + playerPosition.y
  );

  //Next position of the player
  let nextPosition = document.getElementById(
    playerPosition.x + x + "," + (playerPosition.y + y)
  );

  //Next position of the block and used in the goal area
  let nextBlockPosition = document.getElementById(
    playerPosition.x + x * 2 + "," + (playerPosition.y + y * 2)
  );

  //Position used in the goal area
  let thirdPosition = document.getElementById(
    playerPosition.x + x * 3 + "," + (playerPosition.y + y * 3)
  );

  if (nextPosition.classList.contains("entity-block")) {
    if (
      !(
        nextBlockPosition.classList.contains("tile-wall") ||
        nextBlockPosition.classList.contains("entity-block") ||
        nextBlockPosition.classList.contains("entity-block-goal")
      )
    ) {
      if (nextBlockPosition.classList.contains("tile-goal")) {
        if (!thirdPosition.classList.contains("entity-block-goal")) {
          thirdPosition.classList.add("entity-block-goal");
          thirdPosition.classList.remove("tile-goal");
          score++;
          document.getElementById("score").innerHTML = "Score: " + score;
        } else {
          nextBlockPosition.classList.add("entity-block-goal");
          nextBlockPosition.classList.remove("tile-goal");
          score++;
          document.getElementById("score").innerHTML = "Score: " + score;
        }
      } else {
        nextBlockPosition.classList.add("entity-block");
      }

      nextPosition.classList.remove("entity-block");
      nextPosition.classList.add("entity-player");
      currentPosition.classList.remove("entity-player");
      playerPosition.x += x;
      playerPosition.y += y;
    }
  } else {
    if (
      !(
        nextPosition.classList.contains("tile-wall") ||
        nextPosition.classList.contains("tile-goal") ||
        nextPosition.classList.contains("entity-block-goal")
      )
    ) {
      nextPosition.classList.add("entity-player");
      currentPosition.classList.remove("entity-player");
      playerPosition.x += x;
      playerPosition.y += y;
    }
  }

  if (score == maxScore) {
    document.getElementById("won").innerHTML = "Game over, you won!";
  }
};

createGameBoard();
