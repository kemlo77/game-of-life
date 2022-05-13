import { Cell } from './cell';

export class Grid {

    private _grid: Cell[][];

    constructor(width: number, height: number) {
        this._grid = this.generateColumnOfRowOfCells(width, height);
    }

    get width(): number {
        return this._grid[0].length;
    }

    get height(): number {
        return this._grid.length;
    }

    cellAt(x: number, y: number): Cell {
        return this._grid[x][y];
    }

    private generateColumnOfRowOfCells(width: number, height: number): Cell[][] {
        return Array(height).fill(0).map(() => this.generateRowOfCells(width));
    }

    private generateRowOfCells(width: number): Cell[] {
        return Array(width).fill(0).map(() => Cell.deadCell());

    }


}