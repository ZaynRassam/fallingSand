
function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
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

var canvasHeight = 400
var canvasWidth= 400
var matrixSize = 3
var squareSize = 5
var backgroundColour = "black";
var hueValue = getRandomInt(255)
var hueValueMultiplier = 1
var hueReset = 1

// grid[col][row]
var n_width;
var n_height;
var grid;
var newGrid;
var canvas
var p5Canvas;
var resetable;

function createGrid(){ 
  n_width = ~~(canvasWidth / squareSize)
  n_height = ~~(canvasHeight / squareSize)

  grid = make2darray(n_width, n_height)
  grid = populateGrid(grid, 0)
  newGrid = make2darray(n_width, n_height)
  newGrid = populateGrid(newGrid, 0)
  resetable = false;
}
createGrid()

function setup() {
  canvas = document.getElementById("myCanvas")
  p5Canvas = createCanvas(canvasWidth, canvasHeight, canvas);
  const logElement = document.getElementById("logElement")
}

function placeSand(){ 
  if (mouseX < canvasWidth - 10 && mouseX > 10 && mouseY < canvasHeight && mouseY > 10){
    const selected_row = ~~(mouseY / squareSize)
    const selected_col = ~~(mouseX / squareSize)

    for (let i = 0; i < matrixSize; i++){
      for (let j = 0; j < matrixSize; j++){
        if (grid[selected_col + i][selected_row + j] == 0){
          grid[selected_col + i][selected_row + j] = hueValue
        }
      }
    }
  }
  resetable = true;
}
function mouseDragged() {
  placeSand()
}

function mousePressed() {
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
      } else if (previousGrid[i+1][j+1] == 0) {
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
      square(i*squareSize,j*squareSize,squareSize)
    }
  }
}

function draw() {
  background(220);
  colorMode(HSB, 360,255,255)
  colourGrid(grid)
  grid = sandFall(grid, newGrid)
  hueChange(hueReset)
  logElement.innerHTML = `Frame rate: ${~~frameRate()}`
  disableResetButton()
}


const resetButton = document.getElementById("resetButton");
const randomColourButton = document.getElementById("randomColourButton");

function disableResetButton(){
  if (resetable){
    resetButton.classList.remove("disabled");
    resetButton.removeAttribute('disabled');

  } else {
    resetButton.classList.add("disabled");
    resetButton.disabled = true;
  }
}

resetButton.addEventListener('click', () => {
    grid = populateGrid(grid, 0);
    resetable = false;
});

var canvasWidthSlider = document.getElementById("canvasWidth");
var canvasWidthText = document.getElementById("canvasWidthText")
canvasWidthSlider.oninput = function() {
  canvasWidth = parseInt(canvasWidthSlider.value)
  p5Canvas = createCanvas(canvasWidth, canvasHeight, canvas);
  createGrid()
  canvasWidthText.innerHTML = "Width: " + canvasWidth + "px"
}
canvasWidthText.innerHTML = "Width: " + canvasWidth + "px"


var canvasHeightSlider = document.getElementById("canvasHeight");
var canvasHeightText = document.getElementById("canvasHeightText")
canvasHeightSlider.oninput = function() {
  canvasHeight = parseInt(canvasHeightSlider.value)
  p5Canvas = createCanvas(canvasWidth, canvasHeight, canvas);
  createGrid()
  canvasHeightText.innerHTML = "Height: " + canvasHeight + "px"
}
canvasHeightText.innerHTML = "Height: " + canvasHeight + "px"


var squareSizeSlider = document.getElementById("squareSize");
var squareSizeText = document.getElementById("squareSizeText")
squareSizeSlider.oninput = function() {
  squareSize = parseInt(squareSizeSlider.value)
  p5Canvas = createCanvas(canvasWidth, canvasHeight, canvas);
  createGrid()
  squareSizeText.innerHTML = "Square Size: " + squareSize + "px"
}
squareSizeText.innerHTML = "Square Size: " + squareSize + "px"


var matrixSizeSlider = document.getElementById("matrixSize");
var matrixSizeText = document.getElementById("matrixSizeText")
matrixSizeSlider.oninput = function() {
  matrixSize = parseInt(matrixSizeSlider.value)
  p5Canvas = createCanvas(canvasWidth, canvasHeight, canvas);
  createGrid()
  matrixSizeText.innerHTML = "Mateix Size: " + matrixSize + "x" + matrixSize
}
matrixSizeText.innerHTML = "Matrix Size: " + matrixSize + "x" + matrixSize

