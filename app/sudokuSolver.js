fs = require('fs');
var _ = require('underscore');

var sudokuSolver = (function() {

	var generateAndFillBoard = function(number) {
		var newSudoku = [];
		for (var i=0;i<9;i++) {
			newSudoku[i] = [];
			for (var j=0;j<9;j++) {
				newSudoku[i][j] = number;
			}
		}
		return newSudoku;
	};

	var generateEmpty = function() {
		return generateAndFillBoard(0);
	}

	var generatePotentials = function() {
		var potentials = [];
		for (var i=0;i<9;i++) {
			potentials[i] = [];
			for (var j=0;j<9;j++) {
				potentials[i][j] = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
			}
		}
		return potentials;
	};

	Set.prototype.equals = function(otherSet) {
		var hasAll = true;
		for (var number of this.entries()) {
			if (! otherSet.has(number)) {
				hasAll = false;
			}
		}
		return hasAll;
	}

	// Finds the first two number pair in a row and returns the pair and the positions 
	var findRowPair = function(potentials, row) {
		var pairNumbers = new Set();
		var pairPositions = new Set();
		for (var i=0;i<9;i++) {
			pairCount = 1;
			var pairs = new Set();
			start = i;
			testPair = potentials[row][start];
			for (var j=start+1;j<9;j++) {
				if (testPair.equals(potentials[row][j])) {
					pairCount++;
				}
			}
			if (pairCount === 2) {
//				console.log("Row pair found");
			} else {
//				console.log("Number of equals: " + pairCount);
			}
		}
	}

	var preparePotentials = function(potentials, sudoku) {
		for (var i=0;i<9;i++) {
			for (var j=0;j<9;j++) {
				var currentPos = sud.checkPosition(sudoku, i, j);
				potentials[i][j].clear();
				if (currentPos.length > 1) {
					currentPos.forEach(function(number) {
						potentials[i][j].add(number);
					});
				}
			}
		}		
		return potentials;
	};

	var readSudoku = function(filename) {
		aSudoku = this.generateEmpty();
		var data = fs.readFileSync(filename, 'utf8');
			var rows = data.split('\n');
			var rC = 0;
			var cC = 0;
	
			rows.forEach(function(row) {
				var columns = row.split("");
				cC = 0;
				aSudoku[rC] = [];
				columns.forEach(function(column) {
					if (column !== '\r') {
						aSudoku[rC][cC] = parseInt(column);
					}
	 				cC++;
				});
				rC++;
			});
		return aSudoku;
	};

	var checkPosition = function(sudoku, row, column) {
		return _.intersection(this.checkRow(sudoku,row), this.checkColumn(sudoku,column), this.checkBox(sudoku,row,column)).sort();
	};
	
	var checkRowOrColumn = function(sudoku, rowOrColumn, isRowCheck) {
		var left = [];
		for (var i=1;i<10;i++) {
			var hasI = false;
			for (var j=0;j<9;j++) {
				if (isRowCheck) {
					if (sudoku[rowOrColumn][j] == i) {
						hasI = true;
					}
				} else {
					if (sudoku[j][rowOrColumn] == i) {
						hasI = true;
					}
				}
			}
			if (! hasI) {
				left.push(i);
			}
		}
		return left;		
	}

	var checkRow = function(sudoku, row) {
		return checkRowOrColumn(sudoku, row, true);
	};
	
	var checkColumn = function(sudoku, column) {
		return checkRowOrColumn(sudoku, column, false);
	};
	
	var checkBox = function(sudoku, row, column) {
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
	};

	var getBoxStart = function(row) {
		return (Math.floor(row/3)*3);
	};
	
	var isSolved = function(sudoku) {
		for (var i=0;i<9;i++) {
			var hasZero = false;
			for (var j=0;j<9;j++) {
				if (sudoku[i][j] == 0) {
					hasZero = true;
				}
			}
		}
		return !hasZero;
	};
	
	var main = function() {
		var sudoku = [];
		sud = this;
		console.log('Sudoku solver v0.25');
		console.log();
		var s = 1;
	
		while (fs.existsSync('./sudokus/' + s + '.txt')) {
			sudoku = this.readSudoku('./sudokus/' + s + '.txt');

			sudoku = this.soleCandidateSolve(sudoku, s);
		
			if (! this.isSolved(sudoku)) {
				console.log("Couldn't solve " + s + ".txt with sole candidate strategy");
				sudoku = this.uniqueCandidateSolve(sudoku);
				var potentials = generatePotentials();
				potentials = preparePotentials(potentials, sudoku);
				findRowPair(potentials, 0);
//				console.log(potentials);
			} else {
				console.log('Solved ' + s + '.txt');
			}
			s++;
		}
	};

	var uniqueCandidateSolve = function(sudoku) {
		return sudoku;
	};

	var soleCandidateSolve = function(sudoku, s) {
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
			if (this.isSolved(sudoku)) {
				break;
			}
		}

		return sudoku;
	};

	return {
		generateEmpty: generateEmpty,
		generateAndFillBoard: generateAndFillBoard,
		generatePotentials: generatePotentials,
		preparePotentials: preparePotentials,
		readSudoku: readSudoku,
		checkPosition: checkPosition,
		checkRow: checkRow,
		checkColumn: checkColumn,
		checkBox: checkBox,
		isSolved: isSolved,
		getBoxStart: getBoxStart,
		soleCandidateSolve: soleCandidateSolve,
		uniqueCandidateSolve: uniqueCandidateSolve,
		main: main
	};
}());

module.exports = sudokuSolver;