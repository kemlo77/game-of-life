import { Grid } from '../model/grid';
import { CellPainter } from './cellpainters/cellpainter';
import { ForegroundPainter } from './cellpainters/foregroundpainter';
import { SmoothCellPainter } from './cellpainters/smoothpainter';
import { Coordinate } from './coordinate';
import { Cell } from '../model/cell';
import { CellPainterFactory } from './cellpainters/cellpainterfactory';
import { Canvas } from './canvas/canvas';


export class View {

    private _grid: Grid;
    private backgroundCanvas: Canvas;
    private cellPainter: CellPainter;
    private foregroundCanvas: Canvas;
    private _foregroundPainter: ForegroundPainter;
    

    constructor(grid: Grid) {
        this._grid = grid;
        this.backgroundCanvas = new Canvas('gridLayer', grid);
        this.cellPainter = new SmoothCellPainter(this.backgroundCanvas);
        this.foregroundCanvas = new Canvas('foreground', grid);
        this._foregroundPainter = new ForegroundPainter(this.foregroundCanvas);
    }

    changePainter(cellPaintertype: string): void {
        this.cellPainter = CellPainterFactory.getCellPainter(cellPaintertype, this.backgroundCanvas);
    }

    redrawGrid(): void {
        this.cellPainter.clearTheCanvas();
        this.cellPainter.plotCells(this._grid);
    }

    drawMouseCellPosition(position: Coordinate): void {
        const cellAtMousePosition: Cell = this.getCellAtCoordinate(position);
        this._foregroundPainter.colorCellOnMousePosition(cellAtMousePosition);
    }

    removePreviousMouseCellPosition(): void {
        this._foregroundPainter.clearThePreviousCellOnCanvas();
    }

    getCellAtCoordinate(coordinate: Coordinate): Cell {
        return this.foregroundCanvas.getCellAttCoordinate(coordinate);
    }

    public adjustCanvas(): void {
        this.backgroundCanvas.updateCanvasWhenWindowChanges();
        this.foregroundCanvas.updateCanvasWhenWindowChanges();

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