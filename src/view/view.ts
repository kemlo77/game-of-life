import { Grid } from '../model/grid';
import { CellPainter } from './cellpainters/cellpainter';
import { ForegroundPainter } from './cellpainters/foregroundpainter';
import { SmoothCellPainter } from './cellpainters/smoothpainter';
import { Coordinate } from './coordinate';
import { Cell } from '../model/cell';
import { CellPainterFactory } from './cellpainters/cellpainterfactory';
import { Canvas } from './canvas/canvas';


export class View {

    private backgroundCanvas: Canvas = new Canvas('gridLayer');
    private cellPainter: CellPainter = new SmoothCellPainter(this.backgroundCanvas);
    private foregroundCanvas: Canvas = new Canvas('foreground');
    private _foregroundPainter: ForegroundPainter = new ForegroundPainter(this.foregroundCanvas);
    private _grid: Grid;

    constructor(grid: Grid) {
        this._grid = grid;
    }

    changePainter(cellPaintertype: string): void {
        this.cellPainter = CellPainterFactory.getCellPainter(cellPaintertype, this.backgroundCanvas);
    }

    redrawGrid(): void {
        this.cellPainter.clearTheCanvas();
        this.cellPainter.plotCells(this._grid);
    }

    drawMouseCellPosition(position: Coordinate): void {
        const cellAtMousePosition: Cell = this.getClickedCell(position);
        this._foregroundPainter.colorCellOnMousePosition(cellAtMousePosition);
    }

    removePreviousMouseCellPosition(): void {
        this._foregroundPainter.clearThePreviousCellOnCanvas();
    }

    getClickedCell(coordinate: Coordinate): Cell {
        const columnIndex: number = Math.floor(coordinate.x / this.foregroundCanvas.cellWidth);
        const rowIndex: number = Math.floor(coordinate.y / this.foregroundCanvas.cellWidth);
        return this._grid.cellAt(columnIndex, rowIndex);
    }

    public adjustCanvas(): void {
        this.backgroundCanvas.updateCanvasWhenWindowChanges(this._grid.numberOfColumns,this._grid.numberOfRows);
        this.foregroundCanvas.updateCanvasWhenWindowChanges(this._grid.numberOfColumns,this._grid.numberOfRows);

        const div: HTMLDivElement = document.querySelector('div#viewport') as HTMLDivElement;
        div.style.height = this.foregroundCanvas.height + 'px';

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