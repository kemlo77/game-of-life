import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';


export class ClassicCellPainter extends CanvasPainter implements CellPainter {


    plotCells(grid: Grid): void {
        this.paintSquares(grid.allLiveCells(), 'rgba(0,0,0,1)');
    }

}