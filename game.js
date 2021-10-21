const gameBoard = document.getElementById("boardContainer");
const PlayerPosition = {
  X: 0,
  Y: 0,
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
          PlayerPosition.X = row;
          PlayerPosition.Y = col;
          break;
        case "G":
          oneTile.classList.add(Tiles.Goal);
          break;
        default:
          break;
      }

      gameBoard.appendChild(oneTile);
    }
  }
};

createGameBoard();
