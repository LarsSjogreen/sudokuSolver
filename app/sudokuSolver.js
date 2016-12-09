fs = require('fs');
var _ = require('underscore');

function sudokuSolver() {
}

sudokuSolver.prototype.generateEmpty = function() {
	var newSudoku = [];
	for (var i=0;i<9;i++) {
		newSudoku[i] = [];
		for (var j=0;j<9;j++) {
			newSudoku[i][j] = 0;
		}
	}
	return newSudoku;
}

sudokuSolver.prototype.readSudoku = function(filename) {
	emptySudoku = this.generateEmpty();
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

sudokuSolver.prototype.checkPosition = function(sudoku, row, column) {
	return _.intersection(this.checkRow(sudoku,row), this.checkColumn(sudoku,column), this.checkBox(sudoku,row,column)).sort();
}

sudokuSolver.prototype.checkRow = function(sudoku, row) {
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

sudokuSolver.prototype.checkColumn = function(sudoku, column) {
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

sudokuSolver.prototype.checkBox = function(sudoku, row, column) {
	var left = [];
	var startRow = this.getBoxStart(row);
	var startColumn = this.getBoxStart(column);
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

sudokuSolver.prototype.getBoxStart = function(row) {
	return (Math.floor(row/3)*3);
}

sudokuSolver.prototype.isSolved = function(sudoku) {
	for (var i=0;i<9;i++) {
		var hasZero = false;
		for (var j=0;j<9;j++) {
			if (sudoku[i][j] == 0) {
				hasZero = true;
			}
		}
	}
	return !hasZero;
}

sudokuSolver.prototype.main = function() {
	var sudoku = [];
	sud = new sudokuSolver();
	console.log('Sudoku solver v0.2');
	var s = 1;

	while (fs.existsSync('./sudokus/' + s + '.txt')) {
		sudoku = sud.readSudoku('./sudokus/' + s + '.txt');
		console.log();
		console.log('Before:');
		console.log(sudoku);
		console.log();
	
		for (var i=0;i<10;i++) {
			for (var row=0;row<9;row++) {
				for (var col=0;col<9;col++) {
					if (sudoku[row][col] == 0) {
						var pos = sud.checkPosition(sudoku, row, col);
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
		console.log('Solved: ' + this.isSolved(sudoku));
		s++;
	}
}
//main();
module.exports = sudokuSolver;