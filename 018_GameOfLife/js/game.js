// Game Logic
var width = 10;
var height = 10;
var liveCells = {};
var gestatingCells = {};

function Cell(x, y){
  this.x = x;
  this.y = y;
  this.count = 0;
  this.hash = (51 + y) * 51 + x;
}

function getNeighbours(cell, width, height){
  var x = cell.x;
  var y = cell.y;
  var arr = [
    new Cell(x - 1, y - 1),
    new Cell(x    , y - 1),
    new Cell(x + 1, y - 1),
    new Cell(x + 1, y    ),
    new Cell(x + 1, y + 1),
    new Cell(x    , y + 1),
    new Cell(x - 1, y + 1),
    new Cell(x - 1, y    )
  ];

  arr.forEach(function(cell, i){
    if(   cell.x < 0 
       || cell.x > width - 1 
       || cell.y < 0 
       || cell.y > height - 1){
      arr.splice(i, 1);
    }
  })

  return arr;
}

function populate(cellsArr){
  if(cellsArr){
    cellsArr.forEach(function(cell){
      liveCells[cell.hash] = cell;
    })
    return;
  }

  for(var i = 0; i < (width * height * 0.7); i++){
    var x = Math.floor(Math.random() * (width + 1));
    var y = Math.floor(Math.random() * (height + 1));
    var cell = new Cell(x, y);
    liveCells[cell.hash] = cell;
  }
}

function clearPopulation(){
  liveCells = {};
}

function runLifeCycle(){
  // first pass
  for(hash in liveCells){
    var currentCell = liveCells[hash];
    currentCell.count = 0;
    var neighbours = getNeighbours(currentCell, width, height);

    neighbours.forEach(function(neighbour){
      if(neighbour.hash in liveCells){
        currentCell.count++;    
      } else if(neighbour.hash in gestatingCells){
        gestatingCells[neighbour.hash].count++;
      } else {
        gestatingCells[neighbour.hash] = neighbour;
        neighbour.count++;
      }
    });
  }

  // second pass
  for(hash in liveCells){
    var neighboursCount = liveCells[hash].count;
    if(neighboursCount < 2 || neighboursCount > 3){
      delete liveCells[hash];
    }
  }

  for(hash in gestatingCells){
    if(gestatingCells[hash].count === 3){
      liveCells[hash] = gestatingCells[hash];
    }
    delete gestatingCells[hash];
  }
}

// Display and Interaction

function display(){
  var universe = document.getElementById('universe');
  universe.innerHTML = "";

  for(var y = 0; y < height; y++){
    for(var x = 0; x < width; x++){
      var checkBox = document.createElement('input');
      checkBox.type = 'checkbox';
      checkBox.id = (51 + y) * 51 + x;
      checkBox.value = x + " " + y;

      if(checkBox.id in liveCells){
        checkBox.checked = true;
      }
      universe.appendChild(checkBox);
    }
    universe.appendChild(document.createElement('br'));
  }
}

display();

function scanUniverseForChanges(){
  var universe = document.getElementById('universe');
  var elems = universe.childNodes;
  liveCells = {};

  Array.prototype.forEach.call(elems, function(elem){
    if(elem.checked == true){
      var hash = elem.id;
      var x = parseInt(elem.value.split(" ")[0]);
      var y = parseInt(elem.value.split(" ")[1]);

      liveCells[hash] = new Cell(x, y);
    }
  });
}

function addPattern(event){
  document.getElementById('run-button').disabled = false;
  clearPopulation();
  var patternName = event.target.value;
  populate(patterns[patternName]);
  display();
}

var buttons = document.getElementsByName('pattern');

for(var i = 0; i < buttons.length; i++){
  buttons[i].addEventListener('change', addPattern);
}


// Game on and stop
var timer;

function game(){
  document.getElementById('run-button').disabled = true;
  document.getElementById('stop-button').disabled = false;
      
  scanUniverseForChanges();

  timer = setInterval(function(){
    if(Object.keys(liveCells).length === 0){
      stopGame();
    }
    runLifeCycle();
    display();   
  }, 600);  
}

function stopGame(){
  document.getElementById('stop-button').disabled = true;
  document.getElementById('run-button').disabled = false;
  clearInterval(timer);
}