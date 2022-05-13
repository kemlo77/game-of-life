import { Cell } from './cell';

export class Grid {

    private _grid: Cell[][];

    constructor(width: number, height: number) {
        this._grid = this.generateRowOfColumnOfCells(width, height);
    }

    get width(): number {
        return this._grid.length;
    }

    get height(): number {
        return this._grid[0].length;
    }

    cellAt(x: number, y: number): Cell {
        return this._grid[x][y];
    }

    private generateColumnOfCells(height: number): Cell[] {
        return Array(height).fill(0).map(() => new Cell());
    }

    private generateRowOfColumnOfCells(width: number, height: number): Cell[][] {
        return Array(width).fill(0).map(() => this.generateColumnOfCells(height));
    }


}