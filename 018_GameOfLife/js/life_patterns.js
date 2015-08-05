// Patterns for life forms in Conway's Game of Life

// - Still Life -
// ==============

// Beehive

var beehiveArr = [
  new Cell(4, 3), 
  new Cell(5, 3), 
  new Cell(6, 4), 
  new Cell(5, 5), 
  new Cell(4, 5),
  new Cell(3, 4)
];

// Tables

var tablesArr = [
  new Cell(3, 2), 
  new Cell(3, 3), 
  new Cell(4, 3), 
  new Cell(5, 3), 
  new Cell(6, 3),
  new Cell(6, 2),
  new Cell(3, 6),
  new Cell(3, 5),
  new Cell(4, 5),
  new Cell(5, 5),
  new Cell(6, 5),
  new Cell(6, 6)
];

// Bi-blocks

var biBlocksArr = [
  new Cell(2, 2),
  new Cell(3, 2), 
  new Cell(2, 3), 
  new Cell(3, 3), 
  new Cell(6, 2),
  new Cell(7, 2),
  new Cell(6, 3),
  new Cell(7, 3),
  new Cell(2, 6),
  new Cell(3, 6),
  new Cell(2, 7),
  new Cell(3, 7),
  new Cell(6, 6),
  new Cell(7, 6),
  new Cell(6, 7),
  new Cell(7, 7)
];

// Ship and Canoe

var shipAndCanoeArr = [
  new Cell(1, 1),
  new Cell(2, 1),
  new Cell(3, 2), 
  new Cell(3, 3), 
  new Cell(2, 3),
  new Cell(1, 2),
  new Cell(7, 3),
  new Cell(8, 3),
  new Cell(8, 4),
  new Cell(7, 5),
  new Cell(6, 6),
  new Cell(5, 7),
  new Cell(4, 7),
  new Cell(4, 6)
];

// - Gliders -
// ==============

// One Glider

var glidersOneArr = [
  new Cell(0, 2), 
  new Cell(1, 2), 
  new Cell(2, 2), 
  new Cell(2, 1), 
  new Cell(1, 0)
];

// Two Gliders

var glidersTwoArr = [
  new Cell(0, 2), 
  new Cell(1, 2), 
  new Cell(2, 2), 
  new Cell(2, 1), 
  new Cell(1, 0),
  new Cell(8, 0),
  new Cell(7, 1),
  new Cell(7, 2),
  new Cell(8, 2),
  new Cell(9, 2)
];

// Three Gliders

var glidersThreeArr = [
  new Cell(0, 2), 
  new Cell(1, 2), 
  new Cell(2, 2), 
  new Cell(2, 1), 
  new Cell(1, 0),
  new Cell(8, 0),
  new Cell(7, 1),
  new Cell(7, 2),
  new Cell(8, 2),
  new Cell(9, 2),
  new Cell(0, 7),
  new Cell(1, 7),
  new Cell(2, 7),
  new Cell(2, 8),
  new Cell(1, 9)
];

// Four Gliders

var glidersFourArr = [
  new Cell(0, 2), 
  new Cell(1, 2), 
  new Cell(2, 2), 
  new Cell(2, 1), 
  new Cell(1, 0),
  new Cell(8, 0),
  new Cell(7, 1),
  new Cell(7, 2),
  new Cell(8, 2),
  new Cell(9, 2),
  new Cell(0, 7),
  new Cell(1, 7),
  new Cell(2, 7),
  new Cell(2, 8),
  new Cell(1, 9),
  new Cell(8, 9),
  new Cell(7, 8),
  new Cell(7, 7),
  new Cell(8, 7),
  new Cell(9, 7)
];

// - Cyclic Life -
// ==============

// Blinkers

var blinkersArr = [
  new Cell(1, 2),
  new Cell(2, 2), 
  new Cell(3, 2), 
  new Cell(6, 2), 
  new Cell(7, 2),
  new Cell(8, 2),
  new Cell(1, 7),
  new Cell(2, 7),
  new Cell(3, 7),
  new Cell(6, 7),
  new Cell(7, 7),
  new Cell(8, 7)
];

// Octagon 2

var octagonTwoArr = [
  new Cell(4, 1),
  new Cell(5, 1),
  new Cell(6, 2),
  new Cell(7, 3),
  new Cell(8, 4),
  new Cell(8, 5),
  new Cell(7, 6),
  new Cell(6, 7),
  new Cell(5, 8),
  new Cell(4, 8),
  new Cell(3, 7),
  new Cell(2, 6),
  new Cell(1, 5),
  new Cell(1, 4),
  new Cell(2, 3),
  new Cell(3, 2)
];

// Figure Eight

var figureEightArr = [
  new Cell(2, 2),
  new Cell(3, 2),
  new Cell(2, 3),
  new Cell(3, 3),
  new Cell(5, 3),
  new Cell(6, 4),
  new Cell(6, 6),
  new Cell(7, 6),
  new Cell(7, 7),
  new Cell(6, 7),
  new Cell(4, 6),
  new Cell(3, 5)
];

// All patterns

var patterns = {
  'own': [],
  'random': null,
  'beehive' : beehiveArr,
  'tables' : tablesArr,
  'biBlocks' : biBlocksArr,
  'shipAndCanoe' : shipAndCanoeArr,
  'glidersOne' : glidersOneArr,
  'glidersTwo' : glidersTwoArr,
  'glidersThree' : glidersThreeArr,
  'glidersFour' : glidersFourArr,
  'blinkers' : blinkersArr,
  'octagonTwo' : octagonTwoArr,
  'figureEight' : figureEightArr
}