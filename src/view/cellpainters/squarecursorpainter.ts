import { Cell } from '../../model/cell';
import { Canvas } from '../canvas/canvas';

export class SquareCursorPainter {

    private canvas: Canvas;
    private transparentGreen: string = 'rgba(255,127,0,0.6)';
    private previousCell: Cell = new Cell(0,0);

    constructor(canvas: Canvas) {
        this.canvas = canvas;
    }

    clearThePreviousCellOnCanvas(): void {
        this.canvas.clearSquare(this.previousCell);
    }

    colorCellOnMousePosition(cell: Cell): void {
        this.canvas.paintSquares([cell], this.transparentGreen);
        this.previousCell = cell;
    }

}