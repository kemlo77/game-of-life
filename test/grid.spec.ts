import { expect } from 'chai';
import { Grid } from '../src/grid';
import { Cell } from '../src/cell';

describe('grid', () => {

    it('there is a grid', () => {
        const grid: Grid = new Grid(10, 11);
        expect(grid.width).to.equal(10);
        expect(grid.height).to.equal(11);
    });

    it('the grid has cells', () => {
        const grid: Grid = new Grid(10, 10);
        expect(grid.cellAt(0, 0)).instanceOf(Cell);
    });


});