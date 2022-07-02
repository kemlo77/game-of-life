import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';


export class CircularPainter extends CanvasPainter implements CellPainter {

    plotCells(grid: Grid): void {
        this.paintCircles(grid.allLiveCells, this.black);
    }

}