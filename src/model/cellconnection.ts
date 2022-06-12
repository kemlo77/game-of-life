import { Cell } from './cell';

export class CellConnection{

    private _cell1: Cell;
    private _cell2: Cell;

    constructor(cell1: Cell, cell2: Cell) {
        this._cell1 = cell1;
        this._cell2 = cell2;
    }

    get cell1(): Cell {
        return this._cell1;
    }

    get cell2(): Cell {
        return this._cell2;
    }
}