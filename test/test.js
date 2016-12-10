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
});