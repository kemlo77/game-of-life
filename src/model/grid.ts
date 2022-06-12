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

    get allCells(): Cell[] {
        return this._grid.flat();
    }

    get allLiveCells(): Cell[] {
        return this.allCells.filter(cell => cell.isAlive);
    }

    get clusters(): Cell[][] {
        const clusterArray: Cell[][] = [];
        const alreadyChecked: Set<Cell> = new Set();

        for (const livingCell of this.allLiveCells) {
            if (alreadyChecked.has(livingCell)) {
                continue;
            }

            const cluster: Cell[] = [];
            const candidates: Cell[] = [livingCell];

            while (candidates.length > 0) {

                const candidate: Cell = candidates.pop();
                alreadyChecked.add(livingCell);
                cluster.push(candidate);

                candidate.livingNeighbours.forEach(neigbour => {
                    if (!alreadyChecked.has(neigbour)) {
                        alreadyChecked.add(neigbour);
                        candidates.push(neigbour);
                    }
                });
            }
            clusterArray.push(cluster);
        }
        return clusterArray;
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
        this.allCells.forEach(currentCell => {

            this.allCells
                .filter(cell => cell !== currentCell)
                .filter(cell => Math.abs(currentCell.columnIndex - cell.columnIndex) <= 1)
                .filter(cell => Math.abs(currentCell.rowIndex - cell.rowIndex) <= 1)
                .forEach(cell => currentCell.addNeighbour(cell));

        });
    }

    evolve(): void {
        this.allCells.forEach(cell => cell.planFate());
        this.allCells.forEach(cell => cell.executeFate());
    }

    killAll(): void {
        this.allCells.forEach(cell => cell.die());
    }




}