import { Grid } from '../model/grid';
import { CellPainter } from './cellpainters/cellpainter';
import { ForegroundPainter } from './foregroundpainter';
import { SmoothCellPainter } from './cellpainters/smoothpainter';
import { Coordinate } from './coordinate';
import { Cell } from '../model/cell';
import { CellPainterFactory } from './cellpainters/cellpainterfactory';


export class View {

    private _cellPainter: CellPainter = new SmoothCellPainter();
    private _foregroundPainter: ForegroundPainter = new ForegroundPainter();
    private _grid: Grid;
    private _cellWidth: number;

    constructor(grid: Grid) {
        this._grid = grid;
    }

    set cellPainter(cellPainter: CellPainter) {
        cellPainter.gridCellWidth = this._cellWidth;
        this._cellPainter = cellPainter;
    }

    get cellWidth(): number {
        return this._cellWidth;
    }

    changePainter(cellPaintertype: string): void {
        this._cellPainter = CellPainterFactory.getCellPainter(cellPaintertype);
    }

    redrawGrid(): void {
        this._cellPainter.clearTheCanvas();
        this._cellPainter.plotCells(this._grid);
    }

    drawMouseCellPosition(position: Coordinate): void {
        this._foregroundPainter.colorCellOnMousePosition(position);
    }

    removePreviousMouseCellPosition(): void {
        this._foregroundPainter.clearThePreviousCellOnCanvas();
    }

    getClickedCell(coordinate: Coordinate): Cell {
        return this._grid.cellAt(Math.floor(coordinate.x / this.cellWidth), Math.floor(coordinate.y / this.cellWidth));
    }

    public adjustCanvas(): void {
        const newCanvasWidth: number = window.innerWidth - 32;
        const newCanvasHeight: number = window.innerHeight - 16;

        const canvases: NodeListOf<HTMLCanvasElement> = document.querySelectorAll('div#viewport canvas');
        canvases.forEach((canvas) => {
            canvas.width = newCanvasWidth;
            canvas.height = newCanvasHeight;
        });
        const div: HTMLDivElement = document.querySelector('div#viewport') as HTMLDivElement;
        div.style.height = newCanvasHeight + 'px';

        if (newCanvasWidth > newCanvasHeight) {
            this._cellWidth = newCanvasWidth / this._grid.numberOfColumns;
        } else {
            this._cellWidth = newCanvasHeight / this._grid.numberOfRows;
        }

        this._cellPainter.gridCellWidth = this._cellWidth;
        this._foregroundPainter.gridCellWidth = this._cellWidth;
        this.redrawGrid();
    }

    public delayedAdjustCanvas: any = this.debounce((): void => this.adjustCanvas(), 500);

    private debounce<F extends Function>(func: F, wait: number): F {
        let timeoutID: number;
        return <any>function (this: any, ...args: any[]) {
            clearTimeout(timeoutID);
            const context: any = this;
            timeoutID = window.setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }

}