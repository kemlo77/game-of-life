import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';


export class ClassicPainter extends CanvasPainter implements CellPainter {


    plotCells(grid: Grid): void {
        this.paintSquares(grid.allLiveCells, this.black);
    }

}