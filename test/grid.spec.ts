import { expect } from 'chai';
import { Grid } from '../src/grid';
import { Cell } from '../src/cell';

describe('grid', () => {

    it('there is a grid', () => {
        const grid: Grid = new Grid(10, 10);
        expect(grid.width).to.equal(10);
        expect(grid.height).to.equal(10);
    });

    it('the grid has cells', () => {
        const grid: Grid = new Grid(10, 10);
        expect(grid.cellAt(0, 0)).instanceOf(Cell);
    });


});

describe('cells', () => {

    it('there is a cell', () => {
        const cell: Cell = new Cell();
        expect(cell).not.to.be.null;
        expect(cell.value).to.equal(0);
    });

});