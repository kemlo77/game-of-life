import { Cell } from './cell';

export class Grid {

    private _grid: Cell[][];

    constructor(width: number, height: number) {
        this._grid = this.generateColumnOfRowOfCells(width, height);
        this.connectCellsWithNeighbours();
    }

    get width(): number {
        return this._grid[0].length;
    }

    get height(): number {
        return this._grid.length;
    }

    cellAt(x: number, y: number): Cell {
        return this._grid[y][x];
    }

    allCells(): Cell[] {
        return this._grid.flat();
    }

    private generateColumnOfRowOfCells(width: number, height: number): Cell[][] {
        const columnOfRows: Cell[][] = [];
        for (let y: number = 0; y < height; y++) {
            const row: Cell[] = [];
            for (let x: number = 0; x < width; x++) {
                row.push(new Cell(x, y));
            }
            columnOfRows.push(row);
        }
        return columnOfRows;
    }


    private connectCellsWithNeighbours(): void {
        this.allCells().forEach(currentCell => {

            this.allCells()
                .filter(cell => cell !== currentCell)
                .filter(cell => Math.abs(currentCell.x - cell.x) <= 1)
                .filter(cell => Math.abs(currentCell.y - cell.y) <= 1)
                .forEach(cell => currentCell.addNeighbour(cell));

        });
    }






}