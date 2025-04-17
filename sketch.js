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

const CANVAS = 600
const n = 40
const w = CANVAS/n
const backgroundColour = "white";
var sandColour = [255,0,0];

// grid[col][row]
var grid = make2darray(n,n)
grid = populateGrid(grid, 0)
var newGrid = make2darray(n,n)
newGrid = populateGrid(newGrid, 0)

function setup() {
  const canvas = document.getElementById("myCanvas")
  createCanvas(CANVAS, CANVAS, canvas);
}

function mouseDragged() {
  if (mouseX < CANVAS && mouseY < CANVAS){
    const selected_row = ~~(mouseY / w)
    const selected_col = ~~(mouseX / w)
    grid[selected_col][selected_row] = 1
  }
}

function mousePressed() {
  if (mouseX < CANVAS && mouseY < CANVAS){
    const selected_row = ~~(mouseY / w)
    const selected_col = ~~(mouseX / w)
    grid[selected_col][selected_row] = 1
  }
}

function sandFall(previousGrid, newGrid){
  for (let i = 0; i < previousGrid.length; i++){
    if (i < 1 || i > n-2) {continue}
    for (let j = 0; j < previousGrid[i].length; j++){
      if (j > n-1) {continue}
      if (previousGrid[i][j] == 0) {continue}
      if (newGrid[i][j+1] == 0){
        newGrid[i][j] = 0
        newGrid[i][j+1] = 1
      } else if (previousGrid[i+1][j+1] == 0 && previousGrid[i-1][j+1] == 0) {
          newGrid[i][j] = 0
          let direction = choose([-1,1])
          newGrid[i+direction][j+1] = 1
      } else if (previousGrid[i+1][j+1] == 0) {
          newGrid[i][j] = 0
          newGrid[i+1][j+1] = 1
      } else if (previousGrid[i-1][j+1] == 0) {
          newGrid[i][j] = 0
          newGrid[i-1][j+1] = 1
      }
    }
  }
  return newGrid
}

function removeSand(){

}

function colourGrid(grid){
  for (let i = 0; i < grid.length; i++){
    for (let j = 0; j < grid[i].length; j++){
      if (grid[i][j] == 1) {
        fill(sandColour);
      } else {
        fill(backgroundColour);
      }
      square(i*w,j*w,w)
    }
  }
}
function draw() {
  background(220);
  colorMode(RGB)
  colourGrid(grid)
  grid = sandFall(grid, newGrid)
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