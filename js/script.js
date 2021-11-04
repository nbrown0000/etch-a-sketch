let down = false;
let currentColor;
let currentMode;

const gridContainer = document.querySelector('#grid-container');
const colorPicker = document.querySelector('#color-picker');
const colorButton = document.querySelector('#color-button');
const rainbowButton = document.querySelector('#rainbow-button');
const greyscaleButton = document.querySelector('#greyscale-button');
const eraserButton = document.querySelector('#eraser-button');
const clearButton = document.querySelector('#clear-button');

colorPicker.addEventListener('change', (e) => setCurrentColor(e.target.value))
colorButton.addEventListener('click', () => setCurrentMode('color'));
rainbowButton.addEventListener('click', () => setCurrentMode('rainbow'));
greyscaleButton.addEventListener('click', () => setCurrentMode('greyscale'));
eraserButton.addEventListener('click', () => setCurrentMode('eraser'));
clearButton.addEventListener('click', clearGrid)

function mouseEnter(e) {
  if (!down) { return };
  draw(e);
}

function draw(e) {
  if (currentMode === 'color') {
    e.target.style.backgroundColor = `${currentColor}`;
    e.target.style.border = `1px solid ${currentColor}`;
  }
  else if (currentMode === 'rainbow') {
    let r = Math.floor(Math.random()*255)
    let g = Math.floor(Math.random()*255)
    let b = Math.floor(Math.random()*255)
    e.target.style.backgroundColor = `rgb(${r},${g},${b})`;
    e.target.style.border = `1px solid rgb(${r},${g},${b})`;
  }
  else if (currentMode === 'greyscale') {
    let bgColor = e.target.style.backgroundColor
    const rgbArray = bgColor.slice(5,-1).split(",").map(n => parseFloat(n));
    if (rgbArray[0] !== 0 || rgbArray[1] !== 0 || rgbArray[2] !== 0) {
      e.target.style.backgroundColor = "rgba(0,0,0,0.1)";
      e.target.style.border = "rgba(0,0,0,0.1)";
      return;
    }
    let alpha = rgbArray[3];
    if (alpha === 'undefined') {
      alpha = 0.1;
    }
    else if (alpha < 1.0) {
      alpha = alpha + 0.1;
    }

    e.target.style.backgroundColor = `rgba(0,0,0,${alpha})`;
    e.target.style.border = `rgba(0,0,0,${alpha})`;
  }
  else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = `rgba(255,255,255)`;
    e.target.style.border = `rgba(255,255,255)`;
  }
}

function createGrid(size) {
  // const colorPicker = document.querySelector('#color-picker');
  currentColor = colorPicker.value;

  const gridBoxSize = 500;
  // gridbox border 1px
  const cellSize = (gridBoxSize - 2) / size;

  const grid = document.createElement('div');
  grid.classList.add('grid');
  grid.style.border = "1px solid white";
  grid.style.width = `${gridBoxSize}px`;
  grid.style.height = `${gridBoxSize}px`;
  grid.style.display = "flex";
  grid.style.flexWrap = "wrap";
  grid.addEventListener('mouseleave', () => { down = false; })

  for (let i=0; i<size; i++) {
    for (let j=0; j<size; j++) {
      const gridElement = document.createElement('div');
      gridElement.style.border = "1px solid white";
      gridElement.classList.add('gridElement');
      gridElement.style.boxSizing = "border-box";
      gridElement.style.width = `${cellSize}px`;
      gridElement.style.height = `${cellSize}px`;
      gridElement.addEventListener('mouseenter', mouseEnter);
      gridElement.addEventListener('click', draw);
      gridElement.addEventListener('mousedown', () => { down = true })
      gridElement.addEventListener('mouseup', () => { down = false })
      grid.appendChild(gridElement);
    }
  }

  return grid;
}

function clearGrid() {
  const gridElements = document.querySelectorAll('.gridElement');
  gridElements.forEach(element => {
    element.style.backgroundColor = "#FFF";
    element.style.border = "1px solid #FFF";
  });
}

function initilizeGrid(size = 24) {
  updateRange(size);
  let grid = createGrid(size);
  gridContainer.appendChild(grid);
}

function updateRange(val) {
  document.querySelector('#rangeValue').value = "Grid Size: " + val;
}

function activateButton(newMode) {

  switch (currentMode) {
    case 'color': colorButton.classList.remove('active'); break;
    case 'rainbow': rainbowButton.classList.remove('active'); break;
    case 'greyscale': greyscaleButton.classList.remove('active'); break;
    case 'eraser': eraserButton.classList.remove('active'); break;
    default: break;
  }

  switch (newMode) {
    case 'color': colorButton.classList.add('active'); break;
    case 'rainbow': rainbowButton.classList.add('active'); break;
    case 'greyscale': greyscaleButton.classList.add('active'); break;
    case 'eraser': eraserButton.classList.add('active'); break;
    default: break;
  }
}

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

function setCurrentColor(newColor) {
  currentColor = newColor;
}

// SET UP PAGE
setCurrentColor(colorPicker.value)
setCurrentMode('color');
initilizeGrid();