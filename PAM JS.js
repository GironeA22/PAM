const gridContainer = document.querySelector('.grid-container');
const paletteContainer = document.querySelector('.palette-container');
const fillButton = document.querySelector('.fill-button');
const saveButton = document.querySelector('.save-button');
const loadButton = document.querySelector('.load-button');
const clearButton = document.querySelector('.clear-button');
const colorPicker = document.querySelector('.picker');

const paletteColors = ['red', 'orange', 'yellow', 'green', 'blue'];
let paintColor = '#666666';

const allSquares = [];

function makeGrid(height, width) {
  for (let i = 0; i < height; i++) {
    const row = makeRow();
    gridContainer.appendChild(row);
    for (let j = 0; j < width; j++) {
      const square = makeSquare();
      row.appendChild(square);

      square.addEventListener('click', () => {
        square.style.backgroundColor = paintColor;
      });

      square.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        square.style.backgroundColor = '';
      });
    }
  }
}

function makeRow() {
  const row = document.createElement('div');
  row.classList.add('row');

  return row;
}

function makeSquare() {
  const square = document.createElement('div');
  square.classList.add('square');

  allSquares.push(square);

  return square;
}

function fillSquares() {
  fillButton.addEventListener('click', () => {
    allSquares.forEach(square => (square.style.backgroundColor = paintColor));
  });
}

function createColorCircleAndAppend(colorHex) {
  const colorCircle = document.createElement('div');
  colorCircle.classList.add('circle');
  colorCircle.style.backgroundColor = colorHex;

  paletteContainer.appendChild(colorCircle);

  colorCircle.addEventListener('click', () => {
    paintColor = colorCircle.style.backgroundColor;
  });
}

function colorPickerChange() {
  colorPicker.addEventListener('change', (e) => {
    createColorCircleAndAppend(colorPicker.value);
    console.log(colorPicker.value);
    paintColor = colorPicker.value;
  });
}

function createColorPalette() {
  for (let i = 0; i < paletteColors.length; i++) {
    const colorHex = paletteColors[i];

    createColorCircleAndAppend(colorHex);
  }
}

function dragAndDraw() {
  gridContainer.addEventListener('mousedown', () => {
    down = true;
    gridContainer.addEventListener('mouseup', () => {
      down = false;
    });
    gridContainer.addEventListener('mouseover', (e) => {
      if (e.target.className === "square" && down) {
        e.target.style.backgroundColor = paintColor;
      }
    });
  });
}

function saveBtn() {
  saveButton.addEventListener('click', () => {
    const gridArray = [];
    for (let i = 0; i < allSquares.length; i++) {
      const squareColors = allSquares[i];
      gridArray.push(squareColors.style.backgroundColor);
    }

    const gridInfo = {
      grid: gridArray,
    }

    localStorage.setItem('gridSave', JSON.stringify(gridInfo));
  });
}

function loadBtn() {
  loadButton.addEventListener('click', () => {
    const savedGridInfo = JSON.parse(localStorage.getItem('gridSave'));
    for (let i = 0; i < allSquares.length; i++) {
      allSquares[i].style.backgroundColor = savedGridInfo.grid[i];
    }
  });
}

function clear() {
  clearButton.addEventListener('click', () => {
    for (let i = 0; i < allSquares.length; i++) {
      allSquares[i].style.backgroundColor = '';
    }
  });
}

function init() {
  makeGrid(10, 10);
  fillSquares();
  createColorPalette();
  dragAndDraw();
  saveBtn();
  loadBtn();
  colorPickerChange();
  clear();
}

function music() {
  // Playlist array
  var files = [
    "Music/224 Battle Scene A.mp3",
    "Music/117 Battle Scene.mp3",
    "Music/203 Battle Scene 1.mp3",
    "Music/27 Battle 2.mp3",
    "Music/110 Fighting.mp3",
  ];

  // Current index of the files array
  var i = 0;

  // Get the audio element
  var music_player = document.querySelector("#music_list audio");

  // function for moving to next audio file
  function next() {
    // Check for last audio file in the playlist
    if (i === files.length - 1) {
      i = 0;
    } else {
      i++;
    }

    // Change the audio element source
    music_player.src = files[i];
  }

  // Check if the player is selected
  if (music_player === null) {
    throw "Playlist Player does not exists ...";
  } else {
    // Start the player
    music_player.src = files[i];

    // Listen for the music ended event, to play the next audio file
    music_player.addEventListener('ended', next, false)
  }
}
music();
init();