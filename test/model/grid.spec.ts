import { expect } from 'chai';
import { Grid } from '../../src/model/grid';
import { Cell } from '../../src/model/cell';

describe('grid', () => {

    it('there is a grid', () => {
        const grid: Grid = new Grid(10, 13);
        expect(grid.numberOfColumns).to.equal(10);
        expect(grid.numberOfRows).to.equal(13);
    });

    it('the grid has cells', () => {
        const grid: Grid = new Grid(10, 10);
        expect(grid.cellAt(0, 0)).instanceOf(Cell);
    });

    it('cells have neighbours connected', () => {
        const grid: Grid = new Grid(4, 5);
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

        expect(grid.allCells.every(cell => cell.isDead)).to.be.true;
    });


    it('cell xy', () => {
        const grid: Grid = new Grid(4, 5);
        expect(grid.cellAt(0, 1).columnIndex).to.equal(0);
        expect(grid.cellAt(0, 1).rowIndex).to.equal(1);
        expect(grid.cellAt(3, 2).columnIndex).to.equal(3);
        expect(grid.cellAt(3, 2).rowIndex).to.equal(2);
    });

    it('when all are dead, there is no cluster', () => {
        const grid: Grid = new Grid(10, 10);
        expect(grid.clustersOfLiveCells.length).to.equal(0);
    });

    it('when one is a live, there is one cluster', () => {
        const grid: Grid = new Grid(10, 10);
        grid.cellAt(5, 5).live();
        expect(grid.clustersOfLiveCells.length).to.equal(1);
    });

    it('when two separate are alive, there are two clusters', () => {
        const grid: Grid = new Grid(10, 10);
        grid.cellAt(5, 5).live();
        grid.cellAt(7, 9).live();
        expect(grid.clustersOfLiveCells.length).to.equal(2);
    });

    it('when three grouped plus one separate are alive, there are three clusters', () => {
        const grid: Grid = new Grid(10, 10);
        grid.cellAt(5, 5).live();
        grid.cellAt(7, 9).live();
        grid.cellAt(8, 9).live();
        grid.cellAt(9, 9).live();
        grid.cellAt(1, 1).live();
        expect(grid.clustersOfLiveCells.length).to.equal(3);
    });

    it('allLiveCells', () => {
        const grid: Grid = new Grid(10, 10);
        grid.cellAt(5, 5).live();
        grid.cellAt(7, 9).live();
        expect(grid.allLiveCells.length).to.equal(2);
    });




});