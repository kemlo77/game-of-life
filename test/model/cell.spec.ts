
import { expect } from 'chai';
import { Cell } from '../../src/model/cell';

function newLiveCell(): Cell {
    const cell: Cell = new Cell(0, 1);
    cell.live();
    return cell;
}

function newDeadCell(): Cell {
    return new Cell(0, 1);
}

describe('cells', () => {

    it('there is a dead cell', () => {
        const cell: Cell = new Cell(0, 1);
        expect(cell.age).to.equal(0);
        expect(cell.isAlive).to.be.false;
        expect(cell.isDead).to.be.true;
    });

    it('there is a live cell', () => {
        const cell: Cell = new Cell(0, 1);
        cell.live();
        expect(cell.age).to.equal(1);
        expect(cell.isAlive).to.be.true;
        expect(cell.isDead).to.be.false;
    });


    it('killed cell is dead', () => {
        const cell: Cell = new Cell(0, 1);
        cell.live();
        expect(cell.isAlive).to.be.true;
        cell.die();
        expect(cell.isAlive).to.be.false;
        expect(cell.age).to.equal(0);
    });

    it('revived cell is alive', () => {
        const cell: Cell = new Cell(0, 1);
        cell.live();
        expect(cell.isAlive).to.be.true;
        expect(cell.age).to.equal(1);
    });

    it('cell has aged', () => {
        const cell: Cell = new Cell(0, 1);
        cell.live();
        cell.live();
        expect(cell.age).to.equal(2);
    });

    it('cell has neighbours', () => {
        const cell: Cell = new Cell(0, 1);
        cell.addNeighbour(new Cell(0, 1));
        expect(cell.numberOfNeighbours).to.equal(1);
    });

    it('cell has a number of living neighbours', () => {
        const cell: Cell = new Cell(0, 1);
        cell.addNeighbour(newLiveCell());
        cell.addNeighbour(newLiveCell());
        cell.addNeighbour(newDeadCell());
        expect(cell.numberOfLivingNeighbours).to.equal(2);
    });

    it('cell has dead neighbours', () => {
        const cell: Cell = new Cell(0, 1);
        cell.addNeighbour(newLiveCell());
        cell.addNeighbour(newLiveCell());
        cell.addNeighbour(newDeadCell());
        cell.addNeighbour(newDeadCell());
        cell.addNeighbour(newDeadCell());
        expect(cell.deadNeighbours.length).to.equal(3);
        expect(cell.deadNeighbours[0].isDead).to.equal(true);
        expect(cell.deadNeighbours[1].isDead).to.equal(true);
        expect(cell.deadNeighbours[2].isDead).to.equal(true);
    });

    it('cell has living neighbours', () => {
        const cell: Cell = new Cell(0, 1);
        cell.addNeighbour(newLiveCell());
        cell.addNeighbour(newLiveCell());
        cell.addNeighbour(newLiveCell());
        cell.addNeighbour(newDeadCell());
        expect(cell.livingNeighbours.length).to.equal(3);
        expect(cell.livingNeighbours[0].isAlive).to.equal(true);
        expect(cell.livingNeighbours[1].isAlive).to.equal(true);
        expect(cell.livingNeighbours[2].isAlive).to.equal(true);
    });

    describe('living cell with', () => {
        it('1 living neigbours dies', () => {
            const cell: Cell = newLiveCell();
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newDeadCell());
            expect(cell.numberOfLivingNeighbours).to.equal(1);
            cell.planFate();
            cell.executeFate();
            expect(cell.isAlive).to.be.false;
        });

        it('2 living neigbours lives', () => {
            const cell: Cell = newLiveCell();
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newDeadCell());
            expect(cell.numberOfLivingNeighbours).to.equal(2);
            cell.planFate();
            cell.executeFate();
            expect(cell.isAlive).to.be.true;
        });

        it('3 living neigbours lives', () => {
            const cell: Cell = newLiveCell();
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newDeadCell());
            expect(cell.numberOfLivingNeighbours).to.equal(3);
            cell.planFate();
            cell.executeFate();
            expect(cell.isAlive).to.be.true;
        });

        it('4 living neigbours dies', () => {
            const cell: Cell = newLiveCell();
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newDeadCell());
            expect(cell.numberOfLivingNeighbours).to.equal(4);
            cell.planFate();
            cell.executeFate();
            expect(cell.isAlive).to.be.false;
        });
    });

    describe('dead cell with', () => {
        it('2 living neigbours still dead', () => {
            const cell: Cell = new Cell(0, 1);
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newDeadCell());
            cell.planFate();
            cell.executeFate();
            expect(cell.isAlive).to.be.false;
        });

        it('3 living neigbours lives', () => {
            const cell: Cell = new Cell(0, 1);
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newDeadCell());
            cell.planFate();
            cell.executeFate();
            expect(cell.isAlive).to.be.true;
        });

        it('4 living neigbours still dead', () => {
            const cell: Cell = new Cell(0, 1);
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newLiveCell());
            cell.addNeighbour(newDeadCell());
            cell.planFate();
            cell.executeFate();
            expect(cell.isAlive).to.be.false;
        });
    });




    it('cell has coordinate', () => {
        const cell: Cell = new Cell(0, 1);
        expect(cell.x).to.equal(0);
        expect(cell.y).to.equal(1);
    });


});