
import { expect } from 'chai';
import { Cell } from '../src/cell';

describe('cells', () => {

    it('there is a dead cell', () => {
        const cell: Cell = Cell.deadCell();
        expect(cell.age).to.equal(0);
        expect(cell.isAlive).to.be.false;
        expect(cell.isDead).to.be.true;
    });

    it('there is a live cell', () => {
        const cell: Cell = Cell.livingCell();
        expect(cell.age).to.equal(1);
        expect(cell.isAlive).to.be.true;
        expect(cell.isDead).to.be.false;
    });


    it('killed cell is dead', () => {
        const cell: Cell = Cell.livingCell();
        cell.die();
        expect(cell.isAlive).to.be.false;
        expect(cell.age).to.equal(0);
    });

    it('revived cell is alive', () => {
        const cell: Cell = Cell.deadCell();
        cell.live();
        expect(cell.isAlive).to.be.true;
        expect(cell.age).to.equal(1);
    });

    it('cell has aged', () => {
        const cell: Cell = Cell.livingCell();
        cell.live();
        expect(cell.age).to.equal(2);
    });

    it('cell has neighbours', () => {
        const cell: Cell = Cell.livingCell();
        cell.addNeighbour(Cell.livingCell());
        expect(cell.numberOfNeighbours).to.equal(1);
    });

    it('cell has a number of living neighbours', () => {
        const cell: Cell = Cell.livingCell();
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.deadCell());
        expect(cell.livingNeighbours).to.equal(2);
    });

    it('living cell with less than 2 neigbours dies', () => {
        const cell: Cell = Cell.livingCell();
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.deadCell());
        cell.planFate();
        cell.executeFate();
        expect(cell.isAlive).to.be.false;
    });

    it('living cell with 2 neigbours lives', () => {
        const cell: Cell = Cell.livingCell();
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.deadCell());
        cell.planFate();
        cell.executeFate();
        expect(cell.isAlive).to.be.true;
    });
    it('living cell with 3 neigbours lives', () => {
        const cell: Cell = Cell.livingCell();
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.deadCell());
        cell.planFate();
        cell.executeFate();
        expect(cell.isAlive).to.be.true;
    });

    it('living cell with more than 3 neigbours dies', () => {
        const cell: Cell = Cell.livingCell();
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.deadCell());
        cell.planFate();
        cell.executeFate();
        expect(cell.isAlive).to.be.false;
    });

    it('dead cell with 3 neigbours lives', () => {
        const cell: Cell = Cell.deadCell();
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.deadCell());
        cell.planFate();
        cell.executeFate();
        expect(cell.isAlive).to.be.true;
    });

    it('dead cell with 2 neigbours still dead', () => {
        const cell: Cell = Cell.deadCell();
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.deadCell());
        cell.planFate();
        cell.executeFate();
        expect(cell.isAlive).to.be.false;
    });

    it('dead cell with 4 neigbours still dead', () => {
        const cell: Cell = Cell.deadCell();
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.livingCell());
        cell.addNeighbour(Cell.deadCell());
        cell.planFate();
        cell.executeFate();
        expect(cell.isAlive).to.be.false;
    });





});