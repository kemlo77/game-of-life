import { Grid } from '../model/grid';
import { CellPainter } from './cellpainters/cellpainter';
import { SquareCursorPainter } from './cellpainters/squarecursorpainter';
import { Coordinate } from './coordinate';
import { Cell } from '../model/cell';
import { CellPainterFactory } from './cellpainters/cellpainterfactory';
import { Canvas } from './canvas/canvas';


export class View {

    private grid: Grid;
    private backgroundCanvas: Canvas;
    private cellPainter: CellPainter;
    private foregroundCanvas: Canvas;
    private foregroundPainter: SquareCursorPainter;
    

    constructor(grid: Grid) {
        this.grid = grid;
        this.backgroundCanvas = new Canvas('gridLayer', grid);
        this.cellPainter = CellPainterFactory.getCellPainter('smooth', this.backgroundCanvas);
        this.foregroundCanvas = new Canvas('foreground', grid);
        this.foregroundPainter = new SquareCursorPainter(this.foregroundCanvas);
    }

    changePainter(cellPaintertype: string): void {
        this.cellPainter = CellPainterFactory.getCellPainter(cellPaintertype, this.backgroundCanvas);
    }

    redrawGrid(): void {
        this.cellPainter.clearTheCanvas();
        this.cellPainter.plotCells(this.grid);
    }

    drawMouseCellPosition(position: Coordinate): void {
        const cellAtMousePosition: Cell = this.getCellAtCoordinate(position);
        this.foregroundPainter.colorCellOnMousePosition(cellAtMousePosition);
    }

    removePreviousMouseCellPosition(): void {
        this.foregroundPainter.clearThePreviousCellOnCanvas();
    }

    getCellAtCoordinate(coordinate: Coordinate): Cell {
        return this.foregroundCanvas.getCellAttCoordinate(coordinate);
    }

    public adjustCanvas(): void {
        this.backgroundCanvas.updateCanvasWhenWindowChanges();
        this.foregroundCanvas.updateCanvasWhenWindowChanges();
        this.setTheHeightOfTheDiv(this.foregroundCanvas.height);

        this.redrawGrid();
    }

    private setTheHeightOfTheDiv(newHeight: number): void {
        const theDivThatHoldsCanvases: HTMLDivElement = document.querySelector('div#viewport') as HTMLDivElement;
        theDivThatHoldsCanvases.style.height = newHeight + 'px';
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