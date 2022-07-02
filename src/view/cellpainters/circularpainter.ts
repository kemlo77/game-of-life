import { Grid } from '../../model/grid';
import { Canvas } from '../canvas/canvas';
import { CellPainter } from './cellpainter';


export class CircularPainter  extends CellPainter {

    constructor(canvas: Canvas) {
        super(canvas);
    }

    plotCells(grid: Grid): void {
        this.canvas.paintCircles(grid.allLiveCells, this.black);
    }

}