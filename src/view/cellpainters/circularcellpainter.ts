import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';


export class CircularCellPainter extends CanvasPainter implements CellPainter {

    plotCells(grid: Grid): void {
        this.paintBlackCircles(grid.allLiveCells);
    }

}