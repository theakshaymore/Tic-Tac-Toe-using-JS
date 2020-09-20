let boardSize = 3;
let board = [];

let currentPlayer;
let players = ["O", "X"];
let w;
let h;

let winner = null;
let isloop = true;

function setup() {
  createCanvas(400, 400);

  w = width / boardSize;
  h = height / boardSize;

  initLabels();

  for (let i = 0; i < boardSize; ++i) {
    let row = [];
    for (let j = 0; j < boardSize; ++j) {
      row.push("");
    }
    board.push(row);
  }
  // boardSize = createSlider(2, 10, 3);
  currentPlayer = 1;
}

function initLabels() {
  newGameBtn = createButton("New Game");
  newGameBtn.position(width + 30, 50);
  newGameBtn.mousePressed(newGame);

  sizeInc = createButton("Add Rows/Cols (Max 10)");
  sizeInc.position(width + 30, height - 100);
  sizeInc.mousePressed(addSize);

  sizeDec = createButton("Sub Rows/Cols (Min 2)");
  sizeDec.position(width + 30, height - 50);
  sizeDec.mousePressed(subSize);

  sizeP = createP("Size: " + boardSize)
    .style("background-color", "#e0910e")
    .style("font-size", "20px")
    .style("padding", "10px");
  sizeP.position(width + 30, 100);

  currentPlayer = 1;

  turnP = createP(players[currentPlayer] + "'s Turn")
    .style("background-color", "#e0910e")
    .style("font-size", "20px")
    .style("padding", "5px");
  turnP.position(width + 30, 150);

  winnerP = createP("No winner yet")
    .style("background-color", "#e0910e")
    .style("font-size", "25px")
    .style("padding", "5px");
  winnerP.position(width + 30, 200);
}

function newGame() {
  w = width / boardSize;
  h = height / boardSize;

  board = [];

  for (let i = 0; i < boardSize; ++i) {
    let row = [];
    for (let j = 0; j < boardSize; ++j) {
      row.push("");
    }
    board.push(row);
  }
  // boardSize = createSlider(2, 10, 3);
  currentPlayer = 1;

  winner = null;
  isloop = true;

  winnerP.html("No winner yet");
  loop();
}

function addSize() {
  if (boardSize < 10) {
    boardSize++;
    newGame();
  }
}

function subSize() {
  if (boardSize > 2) {
    boardSize--;
    newGame();
  }
}

// Big function to check if a player won the game. (It is big as we need to generalize)
function isWinner() {
  for (let i = 0; i < boardSize; ++i) {
    let temp = board[i][0];
    if (temp == "") continue;
    for (let j = 1; j < boardSize; ++j) {
      if (board[i][j] == "") {
        temp = "";
        break;
      }
      if (board[i][j] != temp) {
        temp = "";
        break;
      }
    }
    if (temp != "") {
      stroke(220, 0, 0);
      strokeWeight(8);
      line(w / 4, w * (i + 0.5), width - w / 4, w * (i + 0.5));
      strokeWeight(4);
      stroke(0);
      return temp;
    }
  }

  for (let i = 0; i < boardSize; ++i) {
    let temp = board[0][i];
    if (temp == "") continue;
    for (let j = 1; j < boardSize; ++j) {
      if (board[j][i] == "") {
        temp = "";
        break;
      }
      if (board[j][i] != temp) {
        temp = "";
        break;
      }
    }
    if (temp != "") {
      stroke(220, 0, 0);
      strokeWeight(8);
      line(w * (i + 0.5), w / 4, w * (i + 0.5), height - w / 4);
      strokeWeight(4);
      stroke(0);
      return temp;
    }
  }

  let temp = board[0][0];
  if (temp != "") {
    for (let i = 1; i < boardSize; ++i) {
      if (board[i][i] == "") {
        temp = "";
        break;
      }
      if (board[i][i] != temp) {
        temp = "";
        break;
      }
    }
  }
  if (temp != "") {
    stroke(220, 0, 0);
    strokeWeight(8);
    line(w / 4, w / 4, width - w / 4, height - w / 4);
    strokeWeight(4);
    stroke(0);
    return temp;
  }

  temp = board[0][boardSize - 1];
  if (temp != "") {
    for (let i = 1; i < boardSize; ++i) {
      if (board[i][boardSize - 1 - i] == "") {
        temp = "";
        break;
      }
      if (board[i][boardSize - 1 - i] != temp) {
        temp = "";
        break;
      }
    }
  }
  if (temp != "") {
    stroke(220, 0, 0);
    strokeWeight(8);
    line(width - w / 4, w / 4, w / 4, height - w / 4);
    strokeWeight(4);
    stroke(0);
    return temp;
  }

  for (let i = 0; i < boardSize; ++i) {
    for (let j = 0; j < boardSize; ++j) {
      if (board[i][j] == "") return null;
    }
  }
  return "TIE";
}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let j = Math.floor(mouseX / w);
    let i = Math.floor(mouseY / h);
    if (board[i][j] != "") return;
    board[i][j] = players[currentPlayer];
    currentPlayer = 1 - currentPlayer;
  }
}

function updateText() {
  sizeP.html("Size: " + boardSize);
  turnP.html(players[currentPlayer] + "'s Turn");
}

function draw() {
  if (isloop) {
    background(220);

    updateText();

    strokeWeight(4);
    noFill();

    for (let i = 1; i < boardSize; ++i) {
      line(0, h * i, width, h * i);
      line(w * i, 0, w * i, height);
    }

    for (let i = 0; i < boardSize; ++i) {
      for (let j = 0; j < boardSize; ++j) {
        let x = w * j + w / 2;
        let y = h * i + h / 2;
        let xr = w / 4;
        let yr = h / 4;

        if (board[i][j] == "X") {
          line(x - xr, y - yr, x + xr, y + yr);
          line(x + xr, y - yr, x - xr, y + yr);
        } else if (board[i][j] == "O") {
          ellipseMode(CENTER);
          ellipse(x, y, xr * 2, yr * 2);
        }
      }
    }

    winner = isWinner();
    if (winner) {
      if (winner == "TIE") winnerP.html(winner);
      else winnerP.html(winner + " is Winner");
      isloop = false;
    }
  }
}
