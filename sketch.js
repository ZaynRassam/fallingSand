function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function make2darray(rows, cols){
  var grid = new Array()
  for (let i = 0; i < rows; i++){
    grid[i] = new Array(cols)
  }
  return grid
}

function populateGrid(grid, value){
  for (let i = 0; i < grid.length; i++){
    for (let j = 0; j < grid[i].length; j++){
      grid[i][j] = value
    }
  }
  return grid 
}

var canvasHeight = 800
var canvasWidth= 400
var matrix = 3
const w = 10
const n_width = canvasWidth / w
const n_height = canvasHeight / w
const backgroundColour = "black";
var hueValue = getRandomInt(255)
var hueValueMultiplier = 1
var hueReset = 1
var sandColour = [255,0,0];

// grid[col][row]
var grid = make2darray(n_width, n_height)
grid = populateGrid(grid, 0)
var newGrid = make2darray(n_width, n_height)
newGrid = populateGrid(newGrid, 0)

function setup() {
  const canvas = document.getElementById("myCanvas")
  createCanvas(canvasWidth, canvasHeight, canvas);
  const logElement = document.getElementById("logElement")
}

function placeSand(){ 
  if (mouseX < canvasWidth - 10 && mouseX > 10 && mouseY < canvasHeight && mouseY > 10){
    const selected_row = ~~(mouseY / w)
    const selected_col = ~~(mouseX / w)

    let extend = floor(matrix/2)
    for (let i = -extend; i < extend + matrix; i++){
      for (let j = -extend; j < extend + matrix; j++){
        grid[selected_col + i][selected_row + j] = hueValue
      }
    }
    hueChange(hueReset)
  }
}
function mouseDragged() {
  placeSand()
}

function mouseIsPressed() {
  placeSand()
}

function sandFall(previousGrid, newGrid){
  for (let i = 0; i < previousGrid.length; i++){
    if (i < 1 || i > n_width-2) {continue}
    for (let j = 0; j < previousGrid[i].length; j++){
      if (j > n_height-1) {continue}
      if (previousGrid[i][j] == 0) {continue}
      if (newGrid[i][j+1] == 0){
        newGrid[i][j] = 0
        newGrid[i][j+1] = hueValue
      } else if (previousGrid[i+1][j+1] == 0 && previousGrid[i-1][j+1] == 0) {
          newGrid[i][j] = 0
          let direction = choose([-1,1])
          newGrid[i+direction][j+1] = hueValue
      } else if (previousGrid[i+1][j+1] == 0) {
          newGrid[i][j] = 0
          newGrid[i+1][j+1] = hueValue
      } else if (previousGrid[i-1][j+1] == 0) {
          newGrid[i][j] = 0
          newGrid[i-1][j+1] = hueValue
      }
    }
  }
  return newGrid
}

function hueChange(hueReset) {
  if (hueReset==1) {
    if (hueValue > 255) {
      hueValue = 1
    }
  } else {
    if (hueValue > 255) {
      hueValueMultiplier = -1
    }
    if (hueValue < 0) {
      hueValueMultiplier = 1
    }
    hueValue = hueValue + 1 * hueValueMultiplier;
  }
  hueValue = hueValue + 0.4;
}

function colourGrid(grid){
  for (let i = 0; i < grid.length; i++){
    for (let j = 0; j < grid[i].length; j++){
      if (grid[i][j] > 0) {
        fill(grid[i][j], 255, 255);
      } else {
        fill(backgroundColour);
      }
      square(i*w,j*w,w)
    }
  }
}

function draw() {
  background(220);
  colorMode(HSB, 360,255,255)
  colourGrid(grid)
  grid = sandFall(grid, newGrid)
  logElement.innerHTML = ~~hueValue.toString() + ", " + hueReset.toString() + ", " + mouseIsPressed + ", " + canvasWidth
}

const resetButton = document.getElementById("resetButton");
const randomColourButton = document.getElementById("randomColourButton");

resetButton.addEventListener('click', () => {
  grid = populateGrid(grid, 0);
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

randomColourButton.addEventListener('click', () => {
  let r = getRandomInt(255)
  let g = getRandomInt(255)
  let b = getRandomInt(255)
  sandColour = [r,g,b];
});