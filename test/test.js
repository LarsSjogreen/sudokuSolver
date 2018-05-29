var expect = require('chai').expect;
var sudoku = require("../app/sudokuSolver.js");

describe('sudokuSolver', function() {
    describe('getBoxStart should return correct start number', function() {
        it('Division correct', function() {
            expect(sudoku.getBoxStart(2)).to.equal(0);
            expect(sudoku.getBoxStart(3)).to.equal(3);
            expect(sudoku.getBoxStart(8)).to.equal(6);
        });
    });

    describe('generateEmpty should create big emtpy sudoku', function(){
        it('should have nine rows', function() {
            expect(sudoku.generateEmpty().length).to.equal(9);
        });
        it('should have nine columns', function() {
            expect(sudoku.generateEmpty()[0].length).to.equal(9);
        });
    });

    describe('generateAndFillBoard(0) should also create a big empty sudoku', function() {
        it('should have nine rows', function() {
            expect(sudoku.generateAndFillBoard(0).length).to.equal(9);
        });
        it('should only contain zeroes', function() {
            expect(sudoku.generateAndFillBoard(0)[0][0]).to.equal(0);
            expect(sudoku.generateAndFillBoard(0)[3][4]).to.equal(0);
        });
    });

    describe('isSolved should only return false if sudoku is filled with zeroes', function() {
        it('should be false if whole board is zero', function() {
            expect(sudoku.isSolved(sudoku.generateAndFillBoard(0))).to.equal(false);
        });
        it('should return false if board is filled with nines', function() {
            expect(sudoku.isSolved(sudoku.generateAndFillBoard(9))).to.equal(false);
        });
    });
});