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

    it('cells have neighbours connected', () => {
        const grid: Grid = new Grid(4, 5);
        grid.allCells();
        expect(grid.cellAt(0, 0).numberOfNeighbours).to.equal(3);
        expect(grid.cellAt(1, 0).numberOfNeighbours).to.equal(5);
        expect(grid.cellAt(2, 0).numberOfNeighbours).to.equal(5);
        expect(grid.cellAt(3, 0).numberOfNeighbours).to.equal(3);

        expect(grid.cellAt(0, 1).numberOfNeighbours).to.equal(5);
        expect(grid.cellAt(1, 1).numberOfNeighbours).to.equal(8);
        expect(grid.cellAt(2, 1).numberOfNeighbours).to.equal(8);
        expect(grid.cellAt(3, 1).numberOfNeighbours).to.equal(5);

        expect(grid.cellAt(0, 2).numberOfNeighbours).to.equal(5);
        expect(grid.cellAt(1, 2).numberOfNeighbours).to.equal(8);
        expect(grid.cellAt(2, 2).numberOfNeighbours).to.equal(8);
        expect(grid.cellAt(3, 2).numberOfNeighbours).to.equal(5);

        expect(grid.cellAt(0, 3).numberOfNeighbours).to.equal(5);
        expect(grid.cellAt(1, 3).numberOfNeighbours).to.equal(8);
        expect(grid.cellAt(2, 3).numberOfNeighbours).to.equal(8);
        expect(grid.cellAt(3, 3).numberOfNeighbours).to.equal(5);

        expect(grid.cellAt(0, 4).numberOfNeighbours).to.equal(3);
        expect(grid.cellAt(1, 4).numberOfNeighbours).to.equal(5);
        expect(grid.cellAt(2, 4).numberOfNeighbours).to.equal(5);
        expect(grid.cellAt(3, 4).numberOfNeighbours).to.equal(3);
    });

    it('all cells are dead', () => {
        const grid: Grid = new Grid(4, 5);

        expect(grid.allCells().every(cell => cell.isDead)).to.be.true;
    });


    it('cell xy', () => {
        const grid: Grid = new Grid(4, 5);
        expect(grid.cellAt(0, 1).x).to.equal(0);
        expect(grid.cellAt(0, 1).y).to.equal(1);
        expect(grid.cellAt(3, 2).x).to.equal(3);
        expect(grid.cellAt(3, 2).y).to.equal(2);
    });


});