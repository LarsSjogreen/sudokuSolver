fs = require('fs');
var _ = require('underscore');

var sudoku = [];

function generateEmpty() {
	var newSudoku = [];
	for (var i=0;i<9;i++) {
		newSudoku[i] = [];
		for (var j=0;j<9;j++) {
			newSudoku[i][j] = 0;
		}
	}
	return newSudoku;
}

function readSudoku(filename) {
	emptySudoku = generateEmpty();
	var data = fs.readFileSync(filename, 'utf8');
		var rows = data.split('\n');
		var rC = 0;
		var cC = 0;

		rows.forEach(function(row) {
			var columns = row.split("");
			cC = 0;
			emptySudoku[rC] = [];
			columns.forEach(function(column) {
				if (column !== '\r') {
					emptySudoku[rC][cC] = parseInt(column);
				}
 				cC++;
			});
			rC++;
		});
	return emptySudoku;
}

function checkPosition(sudoku, row, column) {
	return _.intersection(checkRow(sudoku,row), checkColumn(sudoku,column), checkBox(sudoku,row,column)).sort();
}

function checkRow(sudoku, row) {
	var left = [];
	for (var i=1;i<10;i++) {
		var hasI = false;
		for (var j=0;j<9;j++) {
			if (sudoku[row][j] == i) {
				hasI = true;
			}
		}
		if (! hasI) {
			left.push(i);
		}
	}
	return left;
}

function checkColumn(sudoku, column) {
	var left = [];
	for (var i=1;i<10;i++) {
		var hasI = false;
		for (var j=0;j<9;j++) {
			if (sudoku[j][column] == i) {
				hasI = true;
			}
		}
		if (! hasI) {
			left.push(i);
		}
	}
	return left;
}

function checkBox(sudoku, row, column) {
	var left = [];
	var startRow = getBoxStart(row);
	var startColumn = getBoxStart(column);
	for (var num = 1;num<10;num++) {
		var hasI = false;
		for (var r =0;r<3;r++) {
			for (var c=0;c<3;c++) {
				if (sudoku[r + startRow][c + startColumn] == num) {
					hasI = true;
				}
			}
		}
		if (! hasI) {
			left.push(num);
		}
	}
	return left;
}

function getBoxStart(row) {
	return (Math.floor(row/3)*3);
}

console.log('Sudoku solver v0.2');
sudoku = readSudoku('./test.txt');
console.log();
console.log('Before:');
console.log(sudoku);
console.log();

for (var i=0;i<10;i++) {
	for (var row=0;row<9;row++) {
		for (var col=0;col<9;col++) {
			if (sudoku[row][col] == 0) {
				var pos = checkPosition(sudoku, row, col);
				if (pos.length === 1) {
					sudoku[row][col] = parseInt(pos[0]);
				}
			}
		}
	}
}
console.log();
console.log('After:');
console.log(sudoku);