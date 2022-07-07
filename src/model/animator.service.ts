import { Grid } from './grid';

export class AnimatorService {

    private _grid: Grid;

    constructor(grid: Grid) {
        this._grid = grid;
    }

    private pentaDecathlon: number[][] = [
        [0, 1, 0],
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0],
        [0, 1, 0]
    ];
    private zHexomino: number[][] = [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ];
    private ship: number[][] = [
        [1, 1, 0],
        [1, 0, 1],
        [0, 1, 1]
    ];
    private toad: number[][] = [
        [1, 1, 1, 0],
        [0, 1, 1, 1]
    ];
    private lightweightSpaceship: number[][] = [
        [1, 0, 0, 1, 0],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 1]
    ];
    private glider: number[][] = [
        [0, 0, 1],
        [1, 0, 1],
        [0, 1, 1]
    ];

    private animatePattern(pattern: number[][], posX: number, posY: number): void {
        pattern.forEach((row, rowIndex) => {
            row.forEach((shouldLive, columnIndex) => {
                if (shouldLive) {
                    this._grid.cellAt(posX + columnIndex, posY + rowIndex).live();
                }
            });
        });
    }

    createPentaDecathlon(posX: number, posY: number): void {
        this.animatePattern(this.pentaDecathlon,posX,posY);
    }

    createZhexomino(posX: number, posY: number): void {
        this.animatePattern(this.zHexomino, posX, posY);
    }

    createShip(posX: number, posY: number): void {
        this.animatePattern(this.ship, posX, posY);
    }

    createToad(posX: number, posY: number): void {
        this.animatePattern(this.toad, posX, posY);
    }

    createLightweightSpaceship(posX: number, posY: number): void {
        this.animatePattern(this.lightweightSpaceship, posX, posY);
    }

    createGlider(posX: number, posY: number): void {
        this.animatePattern(this.glider, posX, posY);
    }

    createCorners(): void {
        this._grid.cellAt(0, 0).live();
        this._grid.cellAt(this._grid.numberOfColumns - 1, this._grid.numberOfRows - 1).live();
    }

    createMidpoints(): void {
        this._grid.cellAt(this._grid.numberOfColumns / 2, this._grid.numberOfRows / 2).live();
    }

}