import { Grid } from '../../model/grid';
import { CanvasPainter } from './canvaspainter';
import { CellPainter } from './cellpainter';

export class MoleculeCellPainterThree extends CanvasPainter implements CellPainter {

    plotCells(grid: Grid): void {

        //dela upp cellerna i kluster




        this.paintCellsAsHollowDots(grid.allLiveCells(), 'rgba(0,0,0,1)', 'rgba(128,255,128,1)');
    }





}