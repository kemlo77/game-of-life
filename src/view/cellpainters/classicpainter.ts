import { Grid } from '../../model/grid';
import { Canvas } from '../canvas/canvas';
import { CellPainter } from './cellpainter';


export class ClassicPainter extends CellPainter {

    constructor(canvas: Canvas) {
        super(canvas);
    }

    plotCells(grid: Grid): void {
        this.canvas.paintSquares(grid.allLiveCells, this.black);
    }

}